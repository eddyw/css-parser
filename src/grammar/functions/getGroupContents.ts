import { GRAMMAR_SYMB } from '~/constants'
import { getNode, getJustaposingFromSpace } from '.'
import type { GrammarTokenizerContext } from '~/shared/types'

export function getGroupContents(x: GrammarTokenizerContext, groupShutChar: number = 0) {
	const body: any[] = []
	const root: boolean = groupShutChar === 0

	let currToken: any = null
	let prevToken: any = null
	let lastSpace: any = null
	let maybeVoid: boolean = false
	let combinator: Record<any, any> = {}

	while ((currToken = getNode(x, groupShutChar))) {
		if (currToken.symb === GRAMMAR_SYMB.WHITESPACE) {
			lastSpace = currToken
			continue
		}
		if (currToken.symb === GRAMMAR_SYMB.COMBINATOR) {
			if (!prevToken && prevToken.symb === GRAMMAR_SYMB.COMBINATOR) {
				throw Error(
					'getGroup: a combinator cannot be followed by another combinator or a group cannot start with a combinator',
				)
			}
			combinator[currToken.node] = true
		} else if (prevToken && prevToken.symb !== GRAMMAR_SYMB.COMBINATOR) {
			if (!lastSpace) throw Error('getGroup: What just happened?')
			combinator[' '] = true
			body.push(getJustaposingFromSpace(lastSpace))
		}

		body.push(currToken)
		prevToken = currToken
	}

	if (!root) {
		x.consumeCodeAt0(groupShutChar)
	}

	return {
		body,
		comb: combinator,
		root,
		void: maybeVoid,
	}
}
