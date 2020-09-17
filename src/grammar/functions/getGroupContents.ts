import { getGroupContentsNode, getCombinatorJuxtaposeFromSpace } from '.'
import { getLinkedItem, groupByCombinator } from './shared'
import { ParserScanner, SyntaxKind, SyntaxNode, SyntaxCombinatorKind, LinkedListHead, LinkedListNode } from '../shared'

const ERRORS = {
	FOLLOWED_BY_COMBINATOR: `A combinator cannot be followed by another combinator`,
	COMBINATOR_STARTS_GROUP: `A group cannot start with a combinator`,
	PROBABLY_A_BUG: `Something is broken. Open an issue.`,
	LINKED_LIST_BUG: `Error building LinkedList of combinators. Open an issue.`,
}

export interface CombinatorRecord {
	[SyntaxCombinatorKind.Juxtapose]: LinkedListNode<SyntaxNode.AnyCombinator>[]
	[SyntaxCombinatorKind.Ampersand]: LinkedListNode<SyntaxNode.AnyCombinator>[]
	[SyntaxCombinatorKind.BarDouble]: LinkedListNode<SyntaxNode.AnyCombinator>[]
	[SyntaxCombinatorKind.BarSingle]: LinkedListNode<SyntaxNode.AnyCombinator>[]
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
export function getGroupContents(x: ParserScanner, groupShutChar: number = 0): SyntaxNode.Group {
	const root: boolean = groupShutChar === 0
	const open = x.getPositionOpen()

	let headLink: LinkedListHead = { head: null }
	let currLink: LinkedListNode | null = null
	let prevLink: LinkedListNode | null = null
	let preSpace: SyntaxNode.Space | null = null
	let voidable: boolean = true

	const combinators: CombinatorRecord = {
		[SyntaxCombinatorKind.Juxtapose]: [],
		[SyntaxCombinatorKind.Ampersand]: [],
		[SyntaxCombinatorKind.BarDouble]: [],
		[SyntaxCombinatorKind.BarSingle]: [],
	}

	while (true) {
		currLink = getLinkedItem(getGroupContentsNode(x, groupShutChar))
		if (!currLink) break

		if (currLink.nodule.kind === SyntaxKind.Space) {
			preSpace = currLink.nodule
			continue
		}

		if (currLink.nodule.kind === SyntaxKind.Combinator) {
			if (prevLink == null) throw Error(ERRORS.COMBINATOR_STARTS_GROUP)
			if (prevLink.nodule.kind === SyntaxKind.Combinator) throw Error(ERRORS.FOLLOWED_BY_COMBINATOR)

			prevLink.cousin = currLink
			currLink.return = prevLink

			combinators[currLink.nodule.flag].push(currLink as LinkedListNode<SyntaxNode.AnyCombinator>)

			prevLink = currLink
			continue
		}

		if (prevLink && prevLink.nodule.kind !== SyntaxKind.Combinator) {
			if (!preSpace) throw Error(ERRORS.PROBABLY_A_BUG)

			const juxtapose = getLinkedItem(getCombinatorJuxtaposeFromSpace(preSpace))

			juxtapose.cousin = currLink
			juxtapose.return = prevLink

			prevLink.cousin = juxtapose
			currLink.return = juxtapose

			combinators[SyntaxCombinatorKind.Juxtapose].push(juxtapose)

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
		x.consumeAt0(groupShutChar)
	}

	groupByCombinator(combinators[SyntaxCombinatorKind.Juxtapose], headLink)
	groupByCombinator(combinators[SyntaxCombinatorKind.Ampersand], headLink)
	groupByCombinator(combinators[SyntaxCombinatorKind.BarDouble], headLink)
	groupByCombinator(combinators[SyntaxCombinatorKind.BarSingle], headLink)

	const head = headLink.head

	if (head == null) {
		return {
			kind: SyntaxKind.Group,
			body: [],
			comb: SyntaxCombinatorKind.Juxtapose,
			root,
			void: voidable,
			spot: x.getPositionShut(open),
		}
	}

	if (head.return) throw Error(ERRORS.LINKED_LIST_BUG) // Why would it have a return ???
	if (head.cousin) throw Error(ERRORS.LINKED_LIST_BUG) // How so???

	const headNode = head.nodule as SyntaxNode.AnyComponentValue

	if (headNode.kind === SyntaxKind.Group) {
		headNode.root = root
		headNode.void = voidable

		return headNode
	}

	return {
		kind: SyntaxKind.Group,
		body: [headNode],
		comb: SyntaxCombinatorKind.Juxtapose,
		root,
		void: voidable,
		spot: x.getPositionShut(open),
	}
}
