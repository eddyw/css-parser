import { SYNTAX_SYMB, SYNTAX_TYPE } from '~/constants'
import type { TokenizerContext, CSSShutCurlyBrace } from '~/shared/types'

export function consumeShutCurlyBrace(x: TokenizerContext): Readonly<CSSShutCurlyBrace> {
	return {
		type: SYNTAX_TYPE.SHUT_CURLY_BRACE_TOKEN,
		symb: SYNTAX_SYMB.SHUT_CURLY_BRACE_TOKEN,
		flag: 0,
		node: '}',
		spot: {
			offsetIni: x.open,
			offsetEnd: ++x.shut, // Consume « U+007D RIGHT CURLY BRACKET (}) »
		},
	}
}
