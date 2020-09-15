import { GRAMMAR_SYMB, GRAMMAR_COMBINATOR } from '~/constants'
import { getGroupContentsNode, getCombinatorJuxtaposeFromSpace } from '.'
import { getLinkedItem, groupByCombinator } from './shared'
import type { GrammarTokenizerContext } from '../shared'
import type {
	GrammarGroupLinkedList,
	GrammarCombinators,
	GrammarGroupLinkedListHeadPointer,
	GrammarGroupContentsCombinators,
	GrammarNodeSpace,
	GrammarNodes,
	GrammarNodeGroup,
} from '~/grammar/shared'

const ERRORS = {
	FOLLOWED_BY_COMBINATOR: `A combinator cannot be followed by another combinator`,
	COMBINATOR_STARTS_GROUP: `A group cannot start with a combinator`,
	PROBABLY_A_BUG: `Something is broken. Open an issue.`,
	LINKED_LIST_BUG: `Error building LinkedList of combinators. Open an issue.`,
}

/**
 * Loop through tokens and create a Doubly Linked List structure,
 * where each node contains a link the the next & previous node:
 * e.g:
 *
 *      A         ||          B
 *     ↗           ↖           ↖
 *  cousin:"||"  cousin:"B"  cousin:null
 *  return:null  return:"A"  return:"||"
 *    ↓                         ↓
 *  head                      tail
 *
 * Collect combinators by type in `combinators` record
 * pseudo-code e.g: (from "A || B")
 *
 * combinators[VL_DOUBLE] => [
 *   {
 *     nodule: Combinator Type<||>
 *     cousin: "B"
 *     return: "A"
 *   }
 * ]
 *
 * Then, regroup based on combinator priority
 * @see https://drafts.csswg.org/css-values-4/#component-combinators
 *
 * pseudo-code e.g: (with above combinators[VL_DOUBLE])
 *
 * Group {
 *   body: [
 *     "A", <- `cousin` of Combinator Type<||>
 *     "B", <- `return` of Combinator Type<||>
 *   ]
 *   comb: Combinator Type<||>
 * }
 */
export function getGroupContents(x: GrammarTokenizerContext, groupShutChar: number = 0): GrammarNodeGroup {
	const root: boolean = groupShutChar === 0
	const open = x.getPositionOpen()

	let headLink: GrammarGroupLinkedListHeadPointer = { head: null }
	let currLink: GrammarGroupLinkedList | null = null
	let prevLink: GrammarGroupLinkedList | null = null
	let preSpace: GrammarNodeSpace | null = null
	let voidable: boolean = true

	const combinators: GrammarGroupContentsCombinators = {
		[GRAMMAR_COMBINATOR.JUXTAPOSE]: [],
		[GRAMMAR_COMBINATOR.AMPERSAND]: [],
		[GRAMMAR_COMBINATOR.VL_DOUBLE]: [],
		[GRAMMAR_COMBINATOR.VL_SINGLE]: [],
	}

	while (true) {
		currLink = getLinkedItem(getGroupContentsNode(x, groupShutChar))
		if (!currLink) break

		if (currLink.nodule.symb === GRAMMAR_SYMB.WHITESPACE) {
			preSpace = currLink.nodule
			continue
		}

		if (currLink.nodule.symb === GRAMMAR_SYMB.COMBINATOR) {
			if (prevLink == null) throw Error(ERRORS.COMBINATOR_STARTS_GROUP)
			if (prevLink.nodule.symb === GRAMMAR_SYMB.COMBINATOR) throw Error(ERRORS.FOLLOWED_BY_COMBINATOR)

			prevLink.cousin = currLink
			currLink.return = prevLink

			combinators[currLink.nodule.flag].push(currLink as GrammarGroupLinkedList<GrammarCombinators>)

			prevLink = currLink
			continue
		}

		if (prevLink && prevLink.nodule.symb !== GRAMMAR_SYMB.COMBINATOR) {
			if (!preSpace) throw Error(ERRORS.PROBABLY_A_BUG)

			const juxtapose = getLinkedItem(getCombinatorJuxtaposeFromSpace(preSpace))

			juxtapose.cousin = currLink
			juxtapose.return = prevLink

			prevLink.cousin = juxtapose
			currLink.return = juxtapose

			combinators[GRAMMAR_COMBINATOR.JUXTAPOSE].push(juxtapose)

			prevLink = currLink
			continue
		}

		if (prevLink) {
			prevLink.cousin = currLink
			currLink.return = prevLink
		} else {
			headLink.head = currLink
		}

		prevLink = currLink
	}

	if (!root) {
		x.consumeCodeAt0(groupShutChar)
	}

	groupByCombinator(combinators[GRAMMAR_COMBINATOR.JUXTAPOSE], headLink)
	groupByCombinator(combinators[GRAMMAR_COMBINATOR.AMPERSAND], headLink)
	groupByCombinator(combinators[GRAMMAR_COMBINATOR.VL_DOUBLE], headLink)
	groupByCombinator(combinators[GRAMMAR_COMBINATOR.VL_SINGLE], headLink)

	const head = headLink.head

	if (head == null) {
		return {
			symb: GRAMMAR_SYMB.GROUP,
			body: [],
			comb: GRAMMAR_COMBINATOR.JUXTAPOSE,
			root,
			void: voidable,
			spot: null,
		}
	}

	if (head.return) throw Error(ERRORS.LINKED_LIST_BUG) // Why would it have a return ???
	if (head.cousin) throw Error(ERRORS.LINKED_LIST_BUG) // How so???

	const headNode = head.nodule as GrammarNodes

	if (headNode.symb === GRAMMAR_SYMB.GROUP) {
		headNode.root = root
		headNode.void = voidable

		return headNode
	}

	return {
		symb: GRAMMAR_SYMB.GROUP,
		body: [headNode],
		comb: GRAMMAR_COMBINATOR.JUXTAPOSE,
		root,
		void: voidable,
		spot: x.getPositionShut(open),
	}
}
