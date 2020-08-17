import { NODE_SYMB, NODE_TYPE } from '~/constants'
import type { TokenizerContext, CSSShutCurlyBrace } from '~/shared/types'

export function consumeShutCurlyBrace(x: TokenizerContext): Readonly<CSSShutCurlyBrace> {
	return {
		type: NODE_TYPE.SHUT_CURLY_BRACE_TOKEN,
		symb: NODE_SYMB.SHUT_CURLY_BRACE_TOKEN,
		flag: 0,
		node: '}',
		spot: {
			offsetIni: x.open,
			offsetEnd: ++x.shut, // Consume « U+007D RIGHT CURLY BRACKET (}) »
		},
	}
}
