import { isWhitespace, isNewline } from '~/syntax/definitions'
import { ParserScanner, SyntaxKind, SyntaxNode } from '../shared'

export function getSpace(x: ParserScanner): SyntaxNode.Space {
	const spot = x.getPositionOpen()

	// while (isWhitespace(x.codeAt0)) x.consume(1)
	while (isWhitespace(x.at0)) {
		if (isNewline(x.at0)) x.consumeLne()
		else x.consume(1)
	}

	return {
		kind: SyntaxKind.Space,
		text: x.text.slice(spot.offIni, x.shut),
		spot: x.getPositionShut(spot),
	}
}
