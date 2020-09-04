import { TOKEN, GRAMMAR_SYMB, GRAMMAR_TYPE } from '~/constants'
import type { GrammarTokenizerContext } from '~/shared/types'

export function getCombinatorAmpersand(x: GrammarTokenizerContext) {
	let open = x.shut

	x.consumeCodeAt0(TOKEN.AMPERSAND)
	x.consumeCodeAt0(TOKEN.AMPERSAND)

	return {
		type: GRAMMAR_TYPE.COMBINATOR,
		symb: GRAMMAR_SYMB.COMBINATOR,
		node: '&&',
		spot: {
			offsetIni: open,
			offsetEnd: x.shut,
		},
	}
}
