import { TOKEN, GRAMMAR_SYMB, GRAMMAR_TYPE } from '~/constants'
import { getGroupContents } from '.'
import type { GrammarTokenizerContext } from '~/shared/types'

export function getGroupFunction(x: GrammarTokenizerContext, name: string, open: number) {
	x.consumeCodeAt0(TOKEN.L_PARENTHESIS)

	const node = getGroupContents(x, TOKEN.R_PARENTHESIS)

	return {
		type: GRAMMAR_TYPE.FUNCTION,
		symb: GRAMMAR_SYMB.FUNCTION,
		name,
		node,
		spot: {
			offsetIni: open,
			offsetEnd: x.shut,
		},
	}
}
