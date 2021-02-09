import { TOKEN } from '~/constants'
import { DefinitionSyntax, Node, Kind, KindCombinator } from '~/DefinitionSyntax/shared'
import { getLinkedItem, groupByCombinator, LinkedHead, LinkedNode } from './shared'

const ERRORS = {
	FOLLOWED_BY_COMBINATOR: `A combinator cannot be followed by another combinator`,
	COMBINATOR_STARTS_GROUP: `A group cannot start with a combinator`,
	PROBABLY_A_BUG: `Something is broken. Open an issue.`,
	LINKED_LIST_BUG: `Error building LinkedList of combinators. Open an issue.`,
}

export interface CombinatorRecord {
	[KindCombinator.Juxtapose]: LinkedNode<Node.Combinator.Juxtapose>[]
	[KindCombinator.Ampersand]: LinkedNode<Node.Combinator.Ampersand>[]
	[KindCombinator.BarDouble]: LinkedNode<Node.Combinator.BarDouble>[]
	[KindCombinator.BarSingle]: LinkedNode<Node.Combinator.BarSingle>[]
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
export function getGroupContents(this: DefinitionSyntax, groupShutChar: number = 0): Node.Group {
	const root: boolean = groupShutChar === 0

	let headLink: LinkedHead = { head: null }
	let currLink: LinkedNode | null = null
	let prevLink: LinkedNode | null = null
	let preSpace: Node.Space | null = null
	let voidable: boolean = true

	const combinators: CombinatorRecord = {
		[KindCombinator.Juxtapose]: [],
		[KindCombinator.Ampersand]: [],
		[KindCombinator.BarDouble]: [],
		[KindCombinator.BarSingle]: [],
	}

	while (true) {
		currLink = getLinkedItem(this.getGroupContentsNode(groupShutChar))
		if (!currLink) break

		if (currLink.nodule.kind === Kind.Space) {
			preSpace = currLink.nodule
			continue
		}

		if (currLink.nodule.kind === Kind.Combinator) {
			if (prevLink == null) throw Error(ERRORS.COMBINATOR_STARTS_GROUP)
			if (prevLink.nodule.kind === Kind.Combinator) throw Error(ERRORS.FOLLOWED_BY_COMBINATOR)

			prevLink.cousin = currLink
			currLink.return = prevLink

			combinators[currLink.nodule.flag].push(currLink as LinkedNode<any>)

			prevLink = currLink
			continue
		}

		if (prevLink && prevLink.nodule.kind !== Kind.Combinator) {
			if (!preSpace) throw Error(ERRORS.PROBABLY_A_BUG)

			const juxtapose = getLinkedItem(this.getCombinatorJuxtapose())

			juxtapose.cousin = currLink
			juxtapose.return = prevLink

			prevLink.cousin = juxtapose
			currLink.return = juxtapose

			combinators[KindCombinator.Juxtapose].push(juxtapose)

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
		this.consumeAt0(groupShutChar)
	}

	groupByCombinator(combinators[KindCombinator.Juxtapose], headLink)
	groupByCombinator(combinators[KindCombinator.Ampersand], headLink)
	groupByCombinator(combinators[KindCombinator.BarDouble], headLink)
	groupByCombinator(combinators[KindCombinator.BarSingle], headLink)

	const head = headLink.head

	if (head == null) {
		return {
			kind: Kind.Group,
			body: [],
			comb: KindCombinator.Juxtapose,
			root,
			void: voidable,
		}
	}

	if (head.return) throw Error(ERRORS.LINKED_LIST_BUG) // Why would it have a return ???
	if (head.cousin) throw Error(ERRORS.LINKED_LIST_BUG) // How so???

	const headNode = head.nodule as Node.ComponentValue

	if (headNode.kind === Kind.Group) {
		headNode.root = root
		headNode.void = voidable

		return headNode
	}

	return {
		kind: Kind.Group,
		body: [headNode],
		comb: KindCombinator.Juxtapose,
		root,
		void: voidable,
	}
}

export function getGroupContentsNode(
	this: DefinitionSyntax,
	groupShutChar: number = 0,
): Node.ComponentValue | Node.Space | Node.Combinator.Any | null {
	if (this.at0 === -1) return null

	if (groupShutChar !== 0 && this.at0 === groupShutChar) {
		return null
	}

	if (this.isKeywordChar(this.at0)) {
		return this.getKeywordOrFunction()
	}

	switch (this.at0) {
		case TOKEN.AT: {
			return this.getAtKeywordOrAtFunction()
		}
		case TOKEN.L_SQUARE_BRACKET: {
			return this.getMultiplierOrNode(this.getGroup())
		}
		case TOKEN.LESS_THAN: {
			return this.at1 === TOKEN.SINGLE_QUOTE ? this.getPropertyReference() : this.getPropertyType()
		}
		case TOKEN.VERTICAL_LINE: {
			return this.getCombinatorBarSglDbl()
		}
		case TOKEN.AMPERSAND: {
			return this.getCombinatorAmpersand()
		}
		case TOKEN.COMMA: {
			return this.getLiteralComma()
		}
		case TOKEN.SINGLE_QUOTE: {
			return this.getMultiplierOrNode(this.getString())
		}
		case TOKEN.FORWARD_SOLIDUS:
		case TOKEN.L_PARENTHESIS:
		case TOKEN.R_PARENTHESIS:
			return this.getToken()
	}

	if (this.isWhitespace(this.at0)) {
		return this.getSpace()
	}

	return this.getToken()
}

export function getGroup(this: DefinitionSyntax, root: boolean = false): Node.Group {
	const shutChar = root ? 0 : TOKEN.R_SQUARE_BRACKET

	if (!root) this.consumeAt0(TOKEN.L_SQUARE_BRACKET)

	return this.getGroupContents(shutChar)
}
