import { TOKEN, GRAMMAR_SYMB, GRAMMAR_TYPE, GRAMMAR_COMBINATOR } from '~/constants'
import type { GrammarTokenizerContext } from '~/shared/types'
import type { GrammarNodeCombinatorAmpersand } from '~/grammar/shared'

export function getCombinatorAmpersand(x: GrammarTokenizerContext): GrammarNodeCombinatorAmpersand {
	let open = x.shut

	x.consumeCodeAt0(TOKEN.AMPERSAND)
	x.consumeCodeAt0(TOKEN.AMPERSAND)

	return {
		type: GRAMMAR_TYPE.COMBINATOR,
		symb: GRAMMAR_SYMB.COMBINATOR,
		flag: GRAMMAR_COMBINATOR.AMPERSAND,
		spot: {
			offsetIni: open,
			offsetEnd: x.shut,
		},
	}
}
