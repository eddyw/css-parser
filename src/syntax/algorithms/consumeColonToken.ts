import { SYNTAX_SYMB, SYNTAX_TYPE } from '~/constants'
import type { SyntaxTokenizerContext, CSSColon } from '~/shared/types'

export function consumeColonToken(x: SyntaxTokenizerContext): Readonly<CSSColon> {
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
