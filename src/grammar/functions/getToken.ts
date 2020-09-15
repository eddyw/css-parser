import { GRAMMAR_SYMB } from '~/constants'
import type { GrammarTokenizerContext } from '../shared'
import type { GrammarNodeToken } from '~/grammar/shared'

export function getToken(x: GrammarTokenizerContext): GrammarNodeToken {
	const spot = x.getPositionOpen()

	x.consume(1)

	return {
		symb: GRAMMAR_SYMB.TOKEN,
		node: x.code.slice(spot.offIni, x.shut),
		spot: x.getPositionShut(spot),
	}
}
