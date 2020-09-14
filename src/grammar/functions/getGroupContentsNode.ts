import { TOKEN } from '~/constants'
import { isWhitespace, areIdentifierNameStart } from '~/syntax/definitions'
import {
	getMultiplierOrToken,
	getIdentifierOrFunction,
	getSpaces,
	getString,
	getToken,
	getType,
	getTypeReference,
	getCombinatorVertical,
	getCombinatorAmpersand,
	getComma,
	getGroupBrackets,
	getAtIdentifierOrToken,
} from '.'
import type { GrammarTokenizerContext } from '~/shared/types'
import type { GrammarNodesAndCombinators } from '~/grammar/shared'

const up = Error('Out of bounds')

export function getGroupContentsNode(x: GrammarTokenizerContext, groupShutChar: number = 0): GrammarNodesAndCombinators | null {
	if (x.shut > x.size) throw up
	if (x.codeAt0 === -1) return null

	const codeAt0 = x.codeAt0

	if (groupShutChar !== 0 && codeAt0 === groupShutChar) {
		return null
	}

	if (areIdentifierNameStart(codeAt0, x.codeAt1, x.codeAt2)) {
		return getIdentifierOrFunction(x)
	}

	if (codeAt0 === TOKEN.L_SQUARE_BRACKET) {
		return getMultiplierOrToken(x, getGroupBrackets(x))
	}

	if (codeAt0 === TOKEN.LESS_THAN) {
		if (x.codeAt1 === TOKEN.SINGLE_QUOTE) return getTypeReference(x)
		return getType(x)
	}

	if (codeAt0 === TOKEN.VERTICAL_LINE) {
		return getCombinatorVertical(x)
	}

	if (codeAt0 === TOKEN.AMPERSAND) {
		return getCombinatorAmpersand(x)
	}

	if (codeAt0 === TOKEN.COMMA) {
		return getComma(x)
	}

	if (codeAt0 === TOKEN.SINGLE_QUOTE) {
		return getString(x)
	}

	if (isWhitespace(codeAt0)) {
		return getSpaces(x)
	}

	if (codeAt0 === TOKEN.FORWARD_SOLIDUS || codeAt0 === TOKEN.L_PARENTHESIS || codeAt0 === TOKEN.R_PARENTHESIS) {
		return getToken(x)
	}

	if (codeAt0 === TOKEN.AT) {
		return getAtIdentifierOrToken(x) as any // @todo - come back to fix me!!!
	}

	throw Error(`getNode: Unexpected token "${String.fromCharCode(x.codeAt0)}" (${x.codeAt0}):${(x.open, x.shut)}`)
}
