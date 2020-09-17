import { TOKEN } from '~/constants'
import { isWhitespace, areIdentifierNameStart } from '~/syntax/definitions'
import {
	getMultiplierOrNode,
	getKeywordOrFunction,
	getSpace,
	getDelimiterQuoted,
	getToken,
	getPropertyType,
	getPropertyTypeRef,
	getCombinatorBar,
	getCombinatorAmpersand,
	getComma,
	getGroupBrackets,
	getAtKeyword,
} from '.'
import { ParserScanner, SyntaxNode } from '../shared'

export function getGroupContentsNode(x: ParserScanner, groupShutChar: number = 0): SyntaxNode.Any | null {
	if (x.at0 === -1) return null

	const codeAt0 = x.at0

	if (groupShutChar !== 0 && codeAt0 === groupShutChar) {
		return null
	}

	if (areIdentifierNameStart(codeAt0, x.at1, x.at2)) {
		return getKeywordOrFunction(x)
	}

	if (codeAt0 === TOKEN.L_SQUARE_BRACKET) {
		return getMultiplierOrNode(x, getGroupBrackets(x))
	}

	if (codeAt0 === TOKEN.LESS_THAN) {
		if (x.at1 === TOKEN.SINGLE_QUOTE) return getPropertyTypeRef(x)
		return getPropertyType(x)
	}

	if (codeAt0 === TOKEN.VERTICAL_LINE) {
		return getCombinatorBar(x)
	}

	if (codeAt0 === TOKEN.AMPERSAND) {
		return getCombinatorAmpersand(x)
	}

	if (codeAt0 === TOKEN.COMMA) {
		return getComma(x)
	}

	if (codeAt0 === TOKEN.SINGLE_QUOTE) {
		return getDelimiterQuoted(x)
	}

	if (isWhitespace(codeAt0)) {
		return getSpace(x)
	}

	if (codeAt0 === TOKEN.FORWARD_SOLIDUS || codeAt0 === TOKEN.L_PARENTHESIS || codeAt0 === TOKEN.R_PARENTHESIS) {
		return getToken(x)
	}

	if (codeAt0 === TOKEN.AT) {
		return getAtKeyword(x) as any // @todo - come back to fix me!!!
	}

	// throw Error(`getNode: Unexpected token "${String.fromCharCode(x.at_0)}" (${x.at_0}):${(x.open, x.shut)}`)
	throw Error('Unexpected token') // @todo
}
