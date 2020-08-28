import { SYNTAX_SYMB, SYNTAX_TYPE } from '~/constants'
import { consumeIdentifier } from '.'
import type { SyntaxTokenizerContext, CSSAtKeyword } from '~/shared/types'

export function consumeAtKeywordToken(x: SyntaxTokenizerContext): Readonly<CSSAtKeyword> {
	x.shut += 1 // Consume « U+0040 COMMERCIAL AT (@) »
	x.lead = 1
	consumeIdentifier(x)

	return {
		type: SYNTAX_TYPE.AT_KEYWORD_TOKEN,
		symb: SYNTAX_SYMB.AT_KEYWORD_TOKEN,
		flag: x.flag,
		node: x.code.slice(x.open + x.lead, x.shut),
		open: '@',
		spot: {
			offsetIni: x.open,
			offsetEnd: x.shut,
		},
	}
}
