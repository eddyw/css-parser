import { Node, Kind } from '~/DefinitionSyntax/shared'

export type RawNode = Node.ComponentValue | Node.Combinator.Any | Node.Space

export interface LinkedNode<T extends RawNode = RawNode> {
	nodule: T
	return: LinkedNode | null
	cousin: LinkedNode | null
	ignore: boolean
}
export interface LinkedHead {
	head: LinkedNode | null
}

export function groupByCombinator<T extends Node.Combinator.Any>(combinatorList: LinkedNode<T>[], pointer: LinkedHead) {
	const length = combinatorList.length

	if (length === 0) return

	for (let i = 0; i < length; i++) {
		const combinator = combinatorList[i]

		if (combinator.ignore) continue

		const group: Node.ComponentValue[] = []
		const parent: LinkedNode<Node.Group> = {
			nodule: {
				kind: Kind.Group,
				body: group,
				comb: combinator.nodule.flag,
				root: false,
				void: false,
			},
			return: null,
			cousin: null,
			ignore: false,
		}

		/**
		 * e.g:
		 *       Combinator
		 *      ↙
		 *   A || B
		 *   ↑     ↘
		 *   │    Cousin of combinator
		 * Return of combinator
		 */
		const combinatorReturn = combinator.return!

		/**
		 *  If «Return of combinator» has a «return», then it isn't the head of the Linked List
		 * 	Otherwise, set the head of Linked List as the current group
		 */
		if (combinatorReturn.return) {
			parent.return = combinatorReturn.return
			parent.return.cousin = parent
		} else {
			pointer.head = parent
		}

		group.push(combinatorReturn.nodule as Node.ComponentValue)

		let combinatorCousin = combinator.cousin!

		parent.cousin = combinatorCousin.cousin

		/**
		 * If «Cousin of combinator» doesn't have a «cousin», then it's the tail of the Linked List
		 */
		if (parent.cousin) {
			parent.cousin.return = parent
		}

		group.push(combinatorCousin.nodule as Node.ComponentValue)

		/**
		 * Repeatedly go through the next « Cousin of Cousin of combinator »,
		 * and if it's the same combinator, then add to the same group (basically repeat the above), and
		 * add `.ignore = true`, so the next in the combinator array is ignored.
		 * If it's a different combinator, do nothing (just re-map «return» and «cousin» to current group)
		 * e.g:
		 *       Add `.ignore = true`
		 *         ↗
		 * A || B || C
		 *      │  │  ↘
		 *      │  │ Cousin of Cousin of Cousin of combinator 😅
		 *      │  │
		 *      │   ↘
		 *      │ Cousin of Cousin of combinator
		 *      ↓
		 * Cousin of combinator
		 */

		while ((combinatorCousin = combinatorCousin.cousin!)) {
			if (combinatorCousin.nodule.kind === Kind.Combinator && combinatorCousin.nodule.flag === combinator.nodule.flag) {
				combinatorCousin.ignore = true
				combinatorCousin = combinatorCousin.cousin! // All combinators have a cousin

				parent.cousin = combinatorCousin.cousin

				if (parent.cousin) {
					parent.cousin.return = parent
				}

				group.push(combinatorCousin.nodule as Node.ComponentValue)
			} else {
				parent.cousin = combinatorCousin
				parent.cousin!.return = parent
				break
			}
		}
	}
}
