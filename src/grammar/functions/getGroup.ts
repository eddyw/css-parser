import { TOKEN, GRAMMAR_SYMB, GRAMMAR_TYPE } from '~/constants'
import { getNode } from '.'
import type { GrammarTokenizerContext } from '~/shared/types'

export function getGroup(x: GrammarTokenizerContext, enclosed: boolean) {
	const open = x.shut
	const list: any[] = [] // @todo - fix types
	let token: any = null
	let prevToken: any = null
	let explicit = false
	let disallowEmpty = false

	const combinators: Record<any, any> = {}

	if (enclosed) x.consumeCodeAt0(TOKEN.L_SQUARE_BRACKET)

	while ((token = getNode(x))) {
		if (token.symb === GRAMMAR_SYMB.WHITESPACE) continue

		if (token.symb === GRAMMAR_SYMB.COMBINATOR) {
			if (prevToken === null || prevToken.type === 'Combinator') {
				throw Error('getGroup: unexpected combinator')
			}
			combinators[token.node] = true
		} else if (prevToken !== null && prevToken.symb !== GRAMMAR_SYMB.COMBINATOR) {
			combinators[' '] = true // a b justaposing
			list.push({
				type: GRAMMAR_TYPE.COMBINATOR,
				symb: GRAMMAR_SYMB.COMBINATOR,
				node: ' ',
			})
		}

		list.push(token)
		prevToken = token
	}

	if (prevToken && prevToken.symb === GRAMMAR_SYMB.COMBINATOR) {
		throw Error('getGroup: unexpected combinator')
	}

	if (enclosed) {
		x.consumeCodeAt0(TOKEN.R_SQUARE_BRACKET)

		explicit = true

		if (x.codeAt0 === TOKEN.EXCLAMATION) {
			x.consume(1)
			disallowEmpty = true
		}
	}

	return {
		type: GRAMMAR_TYPE.GROUP,
		symb: GRAMMAR_SYMB.GROUP,
		list,
		comb: combinators,
		disallowEmpty,
		explicit,
		spot: {
			offsetIni: open,
			offsetEnd: x.shut,
		},
	}
}
