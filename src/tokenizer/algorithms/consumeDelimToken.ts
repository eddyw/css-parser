import { NODE_SYMB, NODE_TYPE } from '~/constants'
import type { TokenizerContext, CSSDelimiter } from '~/shared/types'

export function consumeDelimToken(x: TokenizerContext, code: number, node: string): Readonly<CSSDelimiter> {
	return {
		type: NODE_TYPE.DELIMITER_TOKEN,
		symb: NODE_SYMB.DELIMITER_TOKEN,
		flag: x.flag,
		node,
		code,
		spot: {
			offsetIni: x.open,
			offsetEnd: ++x.shut, // Consume « [code] »
		},
	}
}
