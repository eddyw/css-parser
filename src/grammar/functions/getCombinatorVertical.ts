import { TOKEN, GRAMMAR_SYMB, GRAMMAR_TYPE, GRAMMAR_COMBINATOR } from '~/constants'
import type { GrammarTokenizerContext } from '~/shared/types'

export function getCombinatorVertical(x: GrammarTokenizerContext) {
	let open = x.shut

	x.consumeCodeAt0(TOKEN.VERTICAL_LINE)

	if (x.codeAt0 === TOKEN.VERTICAL_LINE) {
		x.consume(1)
		return {
			type: GRAMMAR_TYPE.COMBINATOR,
			symb: GRAMMAR_SYMB.COMBINATOR,
			flag: GRAMMAR_COMBINATOR.VERTICAL_DOUBLE,
			node: '||',
			spot: {
				offsetIni: open,
				offsetEnd: x.shut,
			},
		}
	}

	return {
		type: GRAMMAR_TYPE.COMBINATOR,
		symb: GRAMMAR_SYMB.COMBINATOR,
		flag: GRAMMAR_COMBINATOR.VERTICAL_SINGLE,
		node: '|',
		spot: {
			offsetIni: open,
			offsetEnd: x.shut,
		},
	}
}
