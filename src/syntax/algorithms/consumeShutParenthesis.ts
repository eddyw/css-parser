import { SYNTAX_SYMB, SYNTAX_TYPE } from '~/constants'
import type { SyntaxTokenizerContext, CSSShutParenthesis } from '~/shared/types'

export function consumeShutParenthesis(x: SyntaxTokenizerContext): Readonly<CSSShutParenthesis> {
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
