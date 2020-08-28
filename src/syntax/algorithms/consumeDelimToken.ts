import { SYNTAX_SYMB, SYNTAX_TYPE } from '~/constants'
import type { SyntaxTokenizerContext, CSSDelimiter } from '~/shared/types'

export function consumeDelimToken(x: SyntaxTokenizerContext, code: number, node: string): Readonly<CSSDelimiter> {
	return {
		type: SYNTAX_TYPE.DELIMITER_TOKEN,
		symb: SYNTAX_SYMB.DELIMITER_TOKEN,
		flag: x.flag,
		node,
		code,
		spot: {
			offsetIni: x.open,
			offsetEnd: ++x.shut, // Consume « [code] »
		},
	}
}
