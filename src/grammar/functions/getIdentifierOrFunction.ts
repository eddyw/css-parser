import { TOKEN, GRAMMAR_SYMB } from '~/constants'
import { getIdentifierName, getMultiplierOrToken, getGroupFunction } from '.'
import type { GrammarTokenizerContext } from '../shared'

export function getIdentifierOrFunction(x: GrammarTokenizerContext): any {
	const spot = x.getPositionOpen()
	const name = getIdentifierName(x).node

	if (x.codeAt0 === TOKEN.L_PARENTHESIS) {
		return getGroupFunction(x, name, spot.offIni)
	}

	return getMultiplierOrToken(x, {
		symb: GRAMMAR_SYMB.IDENTIFIER,
		node: name,
		spot: x.getPositionShut(spot),
	})
}
