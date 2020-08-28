import { SYNTAX_SYMB, SYNTAX_TYPE } from '~/constants'
import type { TokenizerContext, CSSOpenSquareBracket } from '~/shared/types'

export function consumeOpenSquareBracket(x: TokenizerContext): Readonly<CSSOpenSquareBracket> {
	return {
		type: SYNTAX_TYPE.OPEN_SQUARE_BRACKET_TOKEN,
		symb: SYNTAX_SYMB.OPEN_SQUARE_BRACKET_TOKEN,
		flag: 0,
		node: '[',
		spot: {
			offsetIni: x.open,
			offsetEnd: ++x.shut, // Consume « U+005B LEFT SQUARE BRACKET ([) »
		},
	}
}
