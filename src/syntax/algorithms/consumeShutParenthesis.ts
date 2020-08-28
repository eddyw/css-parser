import { SYNTAX_SYMB, SYNTAX_TYPE } from '~/constants'
import type { TokenizerContext, CSSShutParenthesis } from '~/shared/types'

export function consumeShutParenthesis(x: TokenizerContext): Readonly<CSSShutParenthesis> {
	return {
		type: SYNTAX_TYPE.SHUT_PARENTHESIS_TOKEN,
		symb: SYNTAX_SYMB.SHUT_PARENTHESIS_TOKEN,
		node: ')',
		flag: 0,
		spot: {
			offsetIni: x.open,
			offsetEnd: ++x.shut, // Consume « U+0029 RIGHT PARENTHESIS ()) »
		},
	}
}
