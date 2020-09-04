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
	getGroup,
} from '.'
import type { GrammarTokenizerContext } from '~/shared/types'

const up = Error('Out of bounds')

export function getNode(x: GrammarTokenizerContext) {
	if (x.shut > x.size) throw up

	if (x.codeAt0 === -1) return null

	if (
		x.codeAt0 === TOKEN.R_SQUARE_BRACKET ||
		x.codeAt0 === TOKEN.ASTERISK ||
		x.codeAt0 === TOKEN.PLUS ||
		x.codeAt0 === TOKEN.QUESTION ||
		x.codeAt0 === TOKEN.HASH ||
		x.codeAt0 === TOKEN.EXCLAMATION ||
		x.codeAt0 === TOKEN.L_CURLY_BRACKET
	) {
		return null
	}

	if (areIdentifierNameStart(x.codeAt0, x.codeAt1, x.codeAt2)) {
		return getIdentifierOrFunction(x)
	}

	if (x.codeAt0 === TOKEN.L_SQUARE_BRACKET) {
		return getMultiplierOrToken(x, getGroup(x, true))
	}

	if (x.codeAt0 === TOKEN.LESS_THAN) {
		if (x.codeAt1 === TOKEN.SINGLE_QUOTE) return getTypeReference(x)
		return getType(x)
	}

	if (x.codeAt0 === TOKEN.VERTICAL_LINE) {
		return getCombinatorVertical(x)
	}

	if (x.codeAt0 === TOKEN.AMPERSAND) {
		return getCombinatorAmpersand(x)
	}

	if (x.codeAt0 === TOKEN.COMMA) {
		return getComma(x)
	}

	if (x.codeAt0 === TOKEN.SINGLE_QUOTE) {
		return getString(x)
	}

	if (isWhitespace(x.codeAt0)) {
		return getSpaces(x)
	}

	if (x.codeAt0 === TOKEN.AT) {
		// return getAtIdentifierOrToken(x)
		return getToken(x)
  }

  return getToken(x)

	// throw Error(`getNode: Unexpected token "${String.fromCharCode(x.codeAt0)}" (${x.codeAt0}):${(x.open, x.shut)}`)
}
