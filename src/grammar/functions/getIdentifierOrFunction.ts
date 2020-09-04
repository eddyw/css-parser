import { TOKEN, GRAMMAR_SYMB, GRAMMAR_TYPE } from '~/constants'
import { getIdentifier, getMultiplierOrToken, getGroupFunction } from '.'
import type { GrammarTokenizerContext } from '~/shared/types'

export function getIdentifierOrFunction(x: GrammarTokenizerContext) {
	const open: number = x.shut
	const name = getIdentifier(x).node

	if (x.codeAt0 === TOKEN.L_PARENTHESIS) {
		return getGroupFunction(x, name, open)
	}

	return getMultiplierOrToken(x, {
		type: GRAMMAR_TYPE.IDENTIFIER,
		symb: GRAMMAR_SYMB.IDENTIFIER,
		node: name,
		spot: {
			offsetIni: open,
			offsetEnd: x.shut,
		},
	})
}
