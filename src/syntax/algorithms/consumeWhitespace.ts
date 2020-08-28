import { SYNTAX_SYMB, SYNTAX_TYPE } from '~/constants'
import { isWhitespace } from '~/syntax/definitions'
import type { TokenizerContext, CSSWhitespace } from '~/shared/types'

/**
 * Consume as much whitespace as possible
 */
export function consumeWhitespace(x: TokenizerContext): Readonly<CSSWhitespace> {
	do {
		x.shut += 1
		x.setCodeAtCurrent()
	} while (isWhitespace(x.codeAt0))

	return {
		type: SYNTAX_TYPE.WHITESPACE_TOKEN,
		symb: SYNTAX_SYMB.WHITESPACE_TOKEN,
		flag: 0,
		node: x.code.slice(x.open, x.shut),
		spot: {
			offsetIni: x.open,
			offsetEnd: x.shut,
		},
	}
}
