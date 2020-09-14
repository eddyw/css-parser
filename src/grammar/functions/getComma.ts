import { TOKEN, GRAMMAR_SYMB, GRAMMAR_TYPE } from '~/constants'
import type { GrammarTokenizerContext } from '~/shared/types'
import type { GrammarNodeComma } from '~/grammar/shared'

export function getComma(x: GrammarTokenizerContext): GrammarNodeComma {
	let open = x.shut

	x.consumeCodeAt0(TOKEN.COMMA)

	return {
		type: GRAMMAR_TYPE.COMMA,
		symb: GRAMMAR_SYMB.COMMA,
		spot: {
			offsetIni: open,
			offsetEnd: x.shut,
		},
	}
}
