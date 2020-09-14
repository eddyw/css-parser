import { TOKEN, GRAMMAR_SYMB, GRAMMAR_TYPE } from '~/constants'
import { getIdentifierName, getMultiplierOrToken, getGroupFunction } from '.'
import type { GrammarTokenizerContext } from '~/shared/types'

/**
 * @todo – Fix typings
 */
export function getIdentifierOrFunction(x: GrammarTokenizerContext): any {
	const open: number = x.shut
	const name = getIdentifierName(x).node

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
