import { TOKEN } from '~/constants'
import { getKeyword, getMultiplierOrNode, getGroupContents } from '.'
import { ParserScanner, SyntaxKind, SyntaxNode } from '../shared'

export function getKeywordOrFunction(x: ParserScanner): SyntaxNode.Keyword | SyntaxNode.Function | SyntaxNode.Multiplier {
	const open = x.getPositionOpen()
	const name = getKeyword(x)

	if (x.at0 === TOKEN.L_PARENTHESIS) {
		x.consume(1)
		return {
			kind: SyntaxKind.Function,
			node: getGroupContents(x, TOKEN.R_PARENTHESIS),
			spot: x.getPositionShut(open),
		}
	}

	return getMultiplierOrNode<SyntaxNode.Keyword>(x, {
		kind: SyntaxKind.Keyword,
		text: name.text,
		spot: x.getPositionShut(open),
	})
}
