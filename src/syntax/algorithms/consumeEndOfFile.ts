import { SYNTAX_SYMB, SYNTAX_TYPE } from '~/constants'
import type { TokenizerContext, CSSEndOfFile } from '~/shared/types'

export function consumeEndOfFile(x: TokenizerContext): Readonly<CSSEndOfFile> {
	x.shut += 1

	return {
		type: SYNTAX_TYPE.END_OF_FILE,
		symb: SYNTAX_SYMB.END_OF_FILE,
		flag: x.flag,
		node: '',
		spot: {
			offsetIni: x.open,
			offsetEnd: x.open,
		},
	}
}
