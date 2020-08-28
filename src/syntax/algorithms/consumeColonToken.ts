import { SYNTAX_SYMB, SYNTAX_TYPE } from '~/constants'
import type { TokenizerContext, CSSColon } from '~/shared/types'

export function consumeColonToken(x: TokenizerContext): Readonly<CSSColon> {
	return {
		type: SYNTAX_TYPE.COLON_TOKEN,
		symb: SYNTAX_SYMB.COLON_TOKEN,
		flag: 0,
		node: ':',
		spot: {
			offsetIni: x.open,
			offsetEnd: ++x.shut, // Consume « U+003A COLON (:) »
		},
	}
}
