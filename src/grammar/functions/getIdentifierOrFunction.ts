import { TOKEN, GRAMMAR_SYMB } from '~/constants'
import { getIdentifierName, getMultiplierOrToken, getGroupFunction } from '.'
import type { GrammarTokenizerContext, GrammarNodes } from '../shared'

export function getIdentifierOrFunction(x: GrammarTokenizerContext): GrammarNodes {
	const open = x.getPositionOpen()
	const name = getIdentifierName(x)

	if (x.codeAt0 === TOKEN.L_PARENTHESIS) {
		return {
			symb: GRAMMAR_SYMB.FUNCTION,
			node: getGroupFunction(x),
			spot: x.getPositionShut(open),
		}
	}

	return getMultiplierOrToken(x, {
		symb: GRAMMAR_SYMB.IDENTIFIER,
		node: name.node,
		spot: x.getPositionShut(open),
	})
}
