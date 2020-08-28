import { NODE_SYMB, NODE_TYPE } from '~/constants'
import type { TokenizerContext, CSSComma } from '~/shared/types'

export function consumeCommaToken(x: TokenizerContext): Readonly<CSSComma> {
	return {
		type: NODE_TYPE.COMMA_TOKEN,
		symb: NODE_SYMB.COMMA_TOKEN,
		flag: 0,
		node: ',',
		spot: {
			offsetIni: x.open,
			offsetEnd: ++x.shut, // Consume « U+002C COMMA (,) »
		},
	}
}
