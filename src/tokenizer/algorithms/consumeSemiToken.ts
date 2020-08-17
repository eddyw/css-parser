import { NODE_SYMB, NODE_TYPE } from '~/constants'
import type { TokenizerContext, CSSSemicolon } from '~/shared/types'

export function consumeSemiToken(x: TokenizerContext): Readonly<CSSSemicolon> {
	return {
		type: NODE_TYPE.SEMICOLON_TOKEN,
		symb: NODE_SYMB.SEMICOLON_TOKEN,
		node: ';',
		flag: 0,
		spot: {
			offsetIni: x.open,
			offsetEnd: ++x.shut, // Consume « U+003B SEMICOLON (;) »
		},
	}
}
