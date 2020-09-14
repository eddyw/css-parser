import { GRAMMAR_SYMB, GRAMMAR_COMBINATOR } from '~/constants'
import { getGroupContentsNode, getCombinatorJuxtaposeFromSpace } from '.'
import { getLinkedItem, groupByCombinator } from './shared'
import type { GrammarTokenizerContext } from '~/shared/types'
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

export function getGroupContents(x: GrammarTokenizerContext, groupShutChar: number = 0): GrammarNodeGroup {
	const root: boolean = groupShutChar === 0

	let headToken: GrammarGroupLinkedListHeadPointer = { head: null }
	let currToken: GrammarGroupLinkedList | null = null
	let prevToken: GrammarGroupLinkedList | null = null
	let lastSpace: GrammarNodeSpace | null = null
	let maybeVoid: boolean = true

	const combinators: GrammarGroupContentsCombinators = {
		[GRAMMAR_COMBINATOR.JUXTAPOSE]: [],
		[GRAMMAR_COMBINATOR.AMPERSAND]: [],
		[GRAMMAR_COMBINATOR.VL_DOUBLE]: [],
		[GRAMMAR_COMBINATOR.VL_SINGLE]: [],
	}

	while (true) {
		currToken = getLinkedItem(getGroupContentsNode(x, groupShutChar))
		if (!currToken) break

		if (currToken.nodule.symb === GRAMMAR_SYMB.WHITESPACE) {
			lastSpace = currToken.nodule
			continue
		}

		if (currToken.nodule.symb === GRAMMAR_SYMB.COMBINATOR) {
			if (prevToken == null) throw Error(ERRORS.COMBINATOR_STARTS_GROUP)
			if (prevToken.nodule.symb === GRAMMAR_SYMB.COMBINATOR) throw Error(ERRORS.FOLLOWED_BY_COMBINATOR)

			prevToken.cousin = currToken
			currToken.return = prevToken

			combinators[currToken.nodule.flag].push(currToken as GrammarGroupLinkedList<GrammarCombinators>)

			prevToken = currToken
			continue
		}

		if (prevToken && prevToken.nodule.symb !== GRAMMAR_SYMB.COMBINATOR) {
			if (!lastSpace) throw Error(ERRORS.PROBABLY_A_BUG)

			const juxtapose = getLinkedItem(getCombinatorJuxtaposeFromSpace(lastSpace))

			juxtapose.cousin = currToken
			juxtapose.return = prevToken

			prevToken.cousin = juxtapose
			currToken.return = juxtapose

			combinators[GRAMMAR_COMBINATOR.JUXTAPOSE].push(juxtapose)

			prevToken = currToken
			continue
		}

		if (prevToken) {
			prevToken.cousin = currToken
			currToken.return = prevToken
		} else {
			headToken.head = currToken
		}

		prevToken = currToken
	}

	if (!root) {
		x.consumeCodeAt0(groupShutChar)
	}

	groupByCombinator(combinators[GRAMMAR_COMBINATOR.JUXTAPOSE], headToken)
	groupByCombinator(combinators[GRAMMAR_COMBINATOR.AMPERSAND], headToken)
	groupByCombinator(combinators[GRAMMAR_COMBINATOR.VL_DOUBLE], headToken)
	groupByCombinator(combinators[GRAMMAR_COMBINATOR.VL_SINGLE], headToken)

	const head = headToken.head

	if (head == null) {
		return {
			symb: GRAMMAR_SYMB.GROUP,
			body: [],
			comb: GRAMMAR_COMBINATOR.JUXTAPOSE,
			root,
			void: maybeVoid,
			spot: null,
		}
	}

	if (head.return) throw Error(ERRORS.LINKED_LIST_BUG) // Why would it have a return ???
	if (head.cousin) throw Error(ERRORS.LINKED_LIST_BUG) // How so???

	const headNode = head.nodule as GrammarNodes

	if (headNode.symb === GRAMMAR_SYMB.GROUP) {
		headNode.root = root
		headNode.void = maybeVoid

		return headNode
	}

	return {
		symb: GRAMMAR_SYMB.GROUP,
		body: [headNode],
		comb: GRAMMAR_COMBINATOR.JUXTAPOSE,
		root,
		void: maybeVoid,
		spot: null,
	}
}
