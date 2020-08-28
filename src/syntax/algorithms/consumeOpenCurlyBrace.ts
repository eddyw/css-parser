import { SYNTAX_SYMB, SYNTAX_TYPE } from '~/constants'
import type { SyntaxTokenizerContext, CSSOpenCurlyBrace } from '~/shared/types'

export function consumeOpenCurlyBrace(x: SyntaxTokenizerContext): Readonly<CSSOpenCurlyBrace> {
	return {
		type: SYNTAX_TYPE.OPEN_CURLY_BRACE_TOKEN,
		symb: SYNTAX_SYMB.OPEN_CURLY_BRACE_TOKEN,
		flag: 0,
		node: '{',
		spot: {
			offsetIni: x.open,
			offsetEnd: ++x.shut, // Consume « U+007B LEFT CURLY BRACKET ({) »
		},
	}
}
