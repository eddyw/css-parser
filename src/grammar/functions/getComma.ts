import { TOKEN, GRAMMAR_SYMB } from '~/constants'
import type { GrammarTokenizerContext } from '../shared'
import type { GrammarNodeComma } from '~/grammar/shared'

export function getComma(x: GrammarTokenizerContext): GrammarNodeComma {
	const spot = x.getPositionOpen()

	x.consumeCodeAt0(TOKEN.COMMA)

	return {
		symb: GRAMMAR_SYMB.COMMA,
		spot: x.getPositionShut(spot),
	}
}
