import { NODE_SYMB, NODE_TYPE } from '~/constants'
import type { TokenizerContext, CSSOpenParenthesis } from '~/shared/types'

export function consumeOpenParenthesis(x: TokenizerContext): Readonly<CSSOpenParenthesis> {
	return {
		type: NODE_TYPE.OPEN_PARENTHESIS_TOKEN,
		symb: NODE_SYMB.OPEN_PARENTHESIS_TOKEN,
		node: '(',
		flag: 0,
		spot: {
			offsetIni: x.open,
			offsetEnd: ++x.shut, // Consume « U+0028 LEFT PARENTHESIS (() »
		},
	}
}
