import { TOKEN, GRAMMAR_SYMB, GRAMMAR_TYPE } from '~/constants'
import { getIdentifierName, getMultiplierOrToken } from '.'
import type { GrammarTokenizerContext } from '../shared'

/**
 * @todo - This sucks
 * Allow for:
 * - @func( [block] )
 * - @ident
 */
export function getAtIdentifierOrToken(x: GrammarTokenizerContext) {
	x.consumeCodeAt0(TOKEN.AT)

	const name = getIdentifierName(x).node

	if (x.codeAt0 === TOKEN.L_PARENTHESIS) {
		x.consume(1)
		return {
			type: GRAMMAR_TYPE.FUNCTION,
			symb: GRAMMAR_SYMB.FUNCTION,
			node: name,
			spot: null,
		}
	}

	return getMultiplierOrToken(x, {
		type: GRAMMAR_TYPE.IDENTIFIER,
		symb: GRAMMAR_SYMB.IDENTIFIER,
		node: name,
		spot: null,
	})
}
