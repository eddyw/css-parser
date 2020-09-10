import { GRAMMAR_SYMB } from '~/constants'
import { getNode, getCombinatorJustaposingFromSpace } from '.'
import type { GrammarTokenizerContext } from '~/shared/types'

const ERRORS = {
	FOLLOWED_BY_COMBINATOR: `A combinator cannot be followed by another combinator`,
	COMBINATOR_STARTS_GROUP: `A group cannot start with a combinator`,
	PROBABLY_A_BUG: `Something is broken. Open an issue.`,
	LINKED_LIST_BUG: `Error building LinkedList of combinators. Open an issue.`
}

/**
 * @todo
 * - Typings 🙈
 * - Combinators object is ugly! and completely unnecessary
 * - Tests .. of course
 * - createGroupBrackets method
 */
export function getGroupContents(x: GrammarTokenizerContext, groupShutChar: number = 0) {
	const root: boolean = groupShutChar === 0

	let headToken: LinkedHead = { head: null as any }
	let currToken: any = null
	let prevToken: any = null
	let lastSpace: any = null
	let maybeVoid: boolean = false

	const combinators = {
		' ': [] as any[],
		'&&': [] as any[],
		'||': [] as any[],
		'|': [] as any[],
	}

	while (true) {
		currToken = getLinkedItem(getNode(x, groupShutChar))
		if (!currToken) break

		if (currToken.nodule.symb === GRAMMAR_SYMB.WHITESPACE) {
			lastSpace = currToken
			continue
		}

		if (currToken.nodule.symb === GRAMMAR_SYMB.COMBINATOR) {
			if (prevToken == null) throw Error(ERRORS.COMBINATOR_STARTS_GROUP)
			if (prevToken.nodule.symb === GRAMMAR_SYMB.COMBINATOR) throw Error(ERRORS.FOLLOWED_BY_COMBINATOR)

			prevToken.cousin = currToken
			currToken.return = prevToken

			combinators[currToken.nodule.node as keyof typeof combinators].push(currToken)

			prevToken = currToken
			continue
		}

		if (prevToken && prevToken.nodule.symb !== GRAMMAR_SYMB.COMBINATOR) {
			if (!lastSpace) throw Error(ERRORS.PROBABLY_A_BUG)

			const juxtapose = getLinkedItem(getCombinatorJustaposingFromSpace(lastSpace))!

			juxtapose.cousin = currToken
			juxtapose.return = prevToken

			prevToken.cousin = juxtapose
			currToken.return = juxtapose

			combinators[' '].push(juxtapose)

			prevToken = currToken
			continue
		}

		if (prevToken) {
			prevToken.cousin = currToken
			currToken.return = prevToken
		} else {
			headToken = currToken
		}

		prevToken = currToken
	}

	if (!root) {
		x.consumeCodeAt0(groupShutChar)
	}

	groupBy(combinators[' '], headToken)
	groupBy(combinators['&&'], headToken)
	groupBy(combinators['||'], headToken)
	groupBy(combinators['|'], headToken)

	if (!headToken.head) throw Error(ERRORS.PROBABLY_A_BUG) // This should never ever happen
	if (headToken.head.return) throw Error(ERRORS.LINKED_LIST_BUG) // Why would it have a return ???
	if (headToken.head.cousin) throw Error(ERRORS.LINKED_LIST_BUG) // How so???

	return {
		body: headToken.head.nodule.node,
		comb: headToken.head.nodule.combinator,
		root,
		void: maybeVoid,
	}
}

interface LinkedItem<T> {
	nodule: T
	return: LinkedItem<any> | null
	cousin: LinkedItem<any> | null
	ignore: boolean
}

interface LinkedHead {
	head: LinkedItem<any>
}

function getLinkedItem<T>(node: T): LinkedItem<T> | null {
	if (node == null) return null
	return {
		nodule: node,
		return: null,
		cousin: null,
		ignore: false,
	}
}

function groupBy(combinatorList: LinkedItem<any>[], header: LinkedHead) {
	const length = combinatorList.length

	if (length === 0) return

	for (let i = 0; i < length; i++) {
		const combinator = combinatorList[i]

		if (combinator.ignore) continue

		const group = [] as any[]
		const parent: LinkedItem<any> = {
			nodule: { node: group, combinator: combinator.nodule.node },
			return: null,
			cousin: null,
			ignore: false,
		}

		const combinatorReturn = combinator.return!

		if (combinatorReturn.return) {
			parent.return = combinatorReturn.return
			parent.return.cousin = parent
		} else {
			header.head = parent
		}

		group.push(combinatorReturn.nodule)

		let combinatorCousin = combinator.cousin!

		parent.cousin = combinatorCousin.cousin

		if (parent.cousin) {
			parent.cousin.return = parent
		}

		group.push(combinatorCousin.nodule)

		while ((combinatorCousin = combinatorCousin.cousin!)) {
			if (combinatorCousin.nodule.node === combinator.nodule.node) {
				combinatorCousin.ignore = true
				combinatorCousin = combinatorCousin.cousin!

				parent.cousin = combinatorCousin.cousin

				if (parent.cousin) {
					parent.cousin.return = parent
				}

				group.push(combinatorCousin.nodule)
			} else {
				parent.cousin = combinatorCousin
				parent.cousin!.return = parent
				break
			}
		}
	}
}
