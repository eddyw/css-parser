import { TOKEN, GRAMMAR_SYMB } from '~/constants'
import type { GrammarTokenizerContext } from '~/shared/types'
import type { GrammarNodeComma } from '~/grammar/shared'

export function getComma(x: GrammarTokenizerContext): GrammarNodeComma {
	let open = x.shut

	x.consumeCodeAt0(TOKEN.COMMA)

	return {
		symb: GRAMMAR_SYMB.COMMA,
		spot: x.getSpot(open, x.shut),
	}
}
