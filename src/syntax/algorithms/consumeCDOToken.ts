import { NODE_SYMB, NODE_TYPE } from '~/constants'
import type { TokenizerContext, CSSCDO } from '~/shared/types'

export function consumeCDOToken(x: TokenizerContext): Readonly<CSSCDO> {
	x.shut += 4 // Consume « <!-- »

	return {
		type: NODE_TYPE.CDO_TOKEN,
		symb: NODE_SYMB.CDO_TOKEN,
		flag: 0,
		node: '<!--',
		spot: {
			offsetIni: x.open,
			offsetEnd: x.shut,
		},
	}
}
