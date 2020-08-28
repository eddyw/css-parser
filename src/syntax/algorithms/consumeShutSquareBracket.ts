import { SYNTAX_SYMB, SYNTAX_TYPE } from '~/constants'
import type { TokenizerContext, CSSShutSquareBracket } from '~/shared/types'

export function consumeShutSquareBracket(x: TokenizerContext): Readonly<CSSShutSquareBracket> {
	return {
		type: SYNTAX_TYPE.SHUT_SQUARE_BRACKET_TOKEN,
		symb: SYNTAX_SYMB.SHUT_SQUARE_BRACKET_TOKEN,
		flag: 0,
		node: ']',
		spot: {
			offsetIni: x.open,
			offsetEnd: ++x.shut, // Consume « U+005D RIGHT SQUARE BRACKET (]) »
		},
	}
}
