import { SYNTAX_SYMB, SYNTAX_TYPE } from '~/constants'
import type { TokenizerContext, CSSOpenParenthesis } from '~/shared/types'

export function consumeOpenParenthesis(x: TokenizerContext): Readonly<CSSOpenParenthesis> {
	return {
		type: SYNTAX_TYPE.OPEN_PARENTHESIS_TOKEN,
		symb: SYNTAX_SYMB.OPEN_PARENTHESIS_TOKEN,
		node: '(',
		flag: 0,
		spot: {
			offsetIni: x.open,
			offsetEnd: ++x.shut, // Consume « U+0028 LEFT PARENTHESIS (() »
		},
	}
}
