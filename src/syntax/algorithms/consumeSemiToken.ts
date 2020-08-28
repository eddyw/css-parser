import { SYNTAX_SYMB, SYNTAX_TYPE } from '~/constants'
import type { SyntaxTokenizerContext, CSSSemicolon } from '~/shared/types'

export function consumeSemiToken(x: SyntaxTokenizerContext): Readonly<CSSSemicolon> {
	return {
		type: SYNTAX_TYPE.SEMICOLON_TOKEN,
		symb: SYNTAX_SYMB.SEMICOLON_TOKEN,
		node: ';',
		flag: 0,
		spot: {
			offsetIni: x.open,
			offsetEnd: ++x.shut, // Consume « U+003B SEMICOLON (;) »
		},
	}
}
