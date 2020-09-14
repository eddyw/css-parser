import { GRAMMAR_SYMB } from '~/constants'
import type { GrammarTokenizerContext } from '~/shared/types'
import type { GrammarNodeToken } from '~/grammar/shared'

export function getToken(x: GrammarTokenizerContext): GrammarNodeToken {
	const open: number = x.shut

	x.consume(1)

	return {
		symb: GRAMMAR_SYMB.TOKEN,
		node: x.code.slice(open, x.shut),
		spot: x.getSpot(open, x.shut),
	}
}
