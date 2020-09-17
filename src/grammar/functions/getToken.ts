import { SyntaxKind } from '../shared'
import { ParserScanner,SyntaxNode } from '../shared'

export function getToken(x: ParserScanner): SyntaxNode.Token {
	const spot = x.getPositionOpen()

	x.consume(1)

	return {
		kind: SyntaxKind.Token,
		node: x.text.slice(spot.offIni, x.shut),
		spot: x.getPositionShut(spot),
	}
}
