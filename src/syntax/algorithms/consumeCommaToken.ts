import { SYNTAX_SYMB, SYNTAX_TYPE } from '~/constants'
import type { TokenizerContext, CSSComma } from '~/shared/types'

export function consumeCommaToken(x: TokenizerContext): Readonly<CSSComma> {
	return {
		type: SYNTAX_TYPE.COMMA_TOKEN,
		symb: SYNTAX_SYMB.COMMA_TOKEN,
		flag: 0,
		node: ',',
		spot: {
			offsetIni: x.open,
			offsetEnd: ++x.shut, // Consume « U+002C COMMA (,) »
		},
	}
}
