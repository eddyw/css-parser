import { NODE_SYMB, NODE_TYPE } from '~/constants'
import type { TokenizerContext, CSSShutParenthesis } from '~/shared/types'

export function consumeShutParenthesis(x: TokenizerContext): Readonly<CSSShutParenthesis> {
	return {
		type: NODE_TYPE.SHUT_PARENTHESIS_TOKEN,
		symb: NODE_SYMB.SHUT_PARENTHESIS_TOKEN,
		node: ')',
		flag: 0,
		spot: {
			offsetIni: x.open,
			offsetEnd: ++x.shut, // Consume « U+0029 RIGHT PARENTHESIS ()) »
		},
	}
}
