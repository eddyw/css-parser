import { GRAMMAR_SYMB } from '~/constants'
import type {
	GrammarGroupLinkedList,
	GrammarCombinators,
	GrammarGroupLinkedListHeadPointer,
	GrammarNodeGroup,
	GrammarNodes,
} from '~/grammar/shared'

export function groupByCombinator<T extends GrammarCombinators>(
	combinatorList: GrammarGroupLinkedList<T>[],
	pointer: GrammarGroupLinkedListHeadPointer,
) {
	const length = combinatorList.length

	if (length === 0) return

	for (let i = 0; i < length; i++) {
		const combinator = combinatorList[i]

		if (combinator.ignore) continue

		const group: GrammarNodes[] = []
		const parent: GrammarGroupLinkedList<GrammarNodeGroup> = {
			nodule: {
				symb: GRAMMAR_SYMB.GROUP,
				body: group,
				comb: combinator.nodule.flag,
				root: false,
				void: false,
				spot: null,
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

		group.push(combinatorReturn.nodule as GrammarNodes)

		let combinatorCousin = combinator.cousin!

		parent.cousin = combinatorCousin.cousin

		/**
		 * If «Cousin of combinator» doesn't have a «cousin», then it's the tail of the Linked List
		 */
		if (parent.cousin) {
			parent.cousin.return = parent
		}

		group.push(combinatorCousin.nodule as GrammarNodes)

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
				combinatorCousin.nodule.symb === GRAMMAR_SYMB.COMBINATOR &&
				combinatorCousin.nodule.flag === combinator.nodule.flag
			) {
				combinatorCousin.ignore = true
				combinatorCousin = combinatorCousin.cousin! // All combinators have a cousin

				parent.cousin = combinatorCousin.cousin

				if (parent.cousin) {
					parent.cousin.return = parent
				}

				group.push(combinatorCousin.nodule as GrammarNodes)
			} else {
				parent.cousin = combinatorCousin
				parent.cousin!.return = parent
				break
			}
		}
	}
}
