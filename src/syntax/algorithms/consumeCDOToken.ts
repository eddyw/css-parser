import { SYNTAX_SYMB, SYNTAX_TYPE } from '~/constants'
import type { TokenizerContext, CSSCDO } from '~/shared/types'

export function consumeCDOToken(x: TokenizerContext): Readonly<CSSCDO> {
	x.shut += 4 // Consume « <!-- »

	return {
		type: SYNTAX_TYPE.CDO_TOKEN,
		symb: SYNTAX_SYMB.CDO_TOKEN,
		flag: 0,
		node: '<!--',
		spot: {
			offsetIni: x.open,
			offsetEnd: x.shut,
		},
	}
}
