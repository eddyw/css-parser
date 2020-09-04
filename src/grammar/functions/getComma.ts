import { TOKEN, GRAMMAR_SYMB, GRAMMAR_TYPE } from '~/constants'
import type { GrammarTokenizerContext } from '~/shared/types'

export function getComma(x: GrammarTokenizerContext) {
	let open = x.shut

	x.consumeCodeAt0(TOKEN.COMMA)

	return {
		type: GRAMMAR_TYPE.COMMA,
		symb: GRAMMAR_SYMB.COMMA,
		node: ',',
		spot: {
			offsetIni: open,
			offsetEnd: x.shut,
		},
	}
}
