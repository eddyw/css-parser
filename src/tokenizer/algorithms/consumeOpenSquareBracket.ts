import { NODE_SYMB, NODE_TYPE } from '~/constants'
import type { TokenizerContext, CSSOpenSquareBracket } from '~/shared/types'

export function consumeOpenSquareBracket(x: TokenizerContext): Readonly<CSSOpenSquareBracket> {
	return {
		type: NODE_TYPE.OPEN_SQUARE_BRACKET_TOKEN,
		symb: NODE_SYMB.OPEN_SQUARE_BRACKET_TOKEN,
		flag: 0,
		node: '[',
		spot: {
			offsetIni: x.open,
			offsetEnd: ++x.shut, // Consume « U+005B LEFT SQUARE BRACKET ([) »
		},
	}
}
