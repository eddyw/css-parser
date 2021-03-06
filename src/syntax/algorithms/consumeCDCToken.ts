import { SYNTAX_SYMB, SYNTAX_TYPE } from '~/constants'
import type { SyntaxTokenizerContext, CSSCDC } from '~/shared/types'

export function consumeCDCToken(x: SyntaxTokenizerContext): Readonly<CSSCDC> {
	x.shut += 3 // Consume « --> »

	return {
		type: SYNTAX_TYPE.CDC_TOKEN,
		symb: SYNTAX_SYMB.CDC_TOKEN,
		flag: 0,
		node: '-->',
		spot: {
			offsetIni: x.open,
			offsetEnd: x.shut,
		},
	}
}
