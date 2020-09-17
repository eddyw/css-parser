import { SyntaxKind, SyntaxNode, LinkedListNode, LinkedListHead } from '../../shared'

export function groupByCombinator<T extends SyntaxNode.AnyCombinator>(
	combinatorList: LinkedListNode<T>[],
	pointer: LinkedListHead,
) {
	const length = combinatorList.length

	if (length === 0) return

	for (let i = 0; i < length; i++) {
		const combinator = combinatorList[i]

		if (combinator.ignore) continue

		const group: SyntaxNode.AnyComponentValue[] = []
		const parent: LinkedListNode<SyntaxNode.Group> = {
			nodule: {
				type: SyntaxKind.Group,
				body: group,
				comb: combinator.nodule.kind,
				root: false,
				void: false,
				spot: null as any, // Assigned later 👇
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

		group.push(combinatorReturn.nodule as SyntaxNode.AnyComponentValue)

		let combinatorCousin = combinator.cousin!

		parent.cousin = combinatorCousin.cousin

		/**
		 * If «Cousin of combinator» doesn't have a «cousin», then it's the tail of the Linked List
		 */
		if (parent.cousin) {
			parent.cousin.return = parent
		}

		group.push(combinatorCousin.nodule as SyntaxNode.AnyComponentValue)

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
			if (
				combinatorCousin.nodule.type === SyntaxKind.Combinator &&
				combinatorCousin.nodule.kind === combinator.nodule.kind
			) {
				combinatorCousin.ignore = true
				combinatorCousin = combinatorCousin.cousin! // All combinators have a cousin

				parent.cousin = combinatorCousin.cousin

				if (parent.cousin) {
					parent.cousin.return = parent
				}

				group.push(combinatorCousin.nodule as SyntaxNode.AnyComponentValue)
			} else {
				parent.cousin = combinatorCousin
				parent.cousin!.return = parent
				break
			}
		}

		if (group.length) {
			const itemIni = group[0]
			const itemEnd = group[group.length - 1]

			if (itemIni.spot && itemEnd.spot) {
				const ini = itemIni.spot
				const end = itemEnd.spot

				parent.nodule.spot = {
					colIni: ini.colIni,
					lneIni: ini.lneIni,
					offIni: ini.offIni,
					colEnd: end.colEnd,
					lneEnd: end.lneEnd,
					offEnd: end.offEnd,
				}
			}
		}
	}
}
