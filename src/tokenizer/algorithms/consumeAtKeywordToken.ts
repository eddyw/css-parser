import { NODE_SYMB, NODE_TYPE } from '~/constants'
import { consumeIdentifier } from '.'
import type { TokenizerContext, CSSAtKeyword } from '~/shared/types'

export function consumeAtKeywordToken(x: TokenizerContext): Readonly<CSSAtKeyword> {
	x.shut += 1 // Consume « U+0040 COMMERCIAL AT (@) »
	x.lead = 1
	consumeIdentifier(x)

	return {
		type: NODE_TYPE.AT_KEYWORD_TOKEN,
		symb: NODE_SYMB.AT_KEYWORD_TOKEN,
		flag: x.flag,
		node: x.code.slice(x.open + x.lead, x.shut),
		open: '@',
		spot: {
			offsetIni: x.open,
			offsetEnd: x.shut,
		},
	}
}
