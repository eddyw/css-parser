import { TOKEN } from '~/constants'
import { SyntaxKind } from '../shared'
import type { ParserScanner, SyntaxNode } from '../shared'

export function getComma(x: ParserScanner): SyntaxNode.Comma {
	const open = x.getPositionOpen()

	x.consumeAt0(TOKEN.COMMA)

	return {
		kind: SyntaxKind.Comma,
		spot: x.getPositionShut(open),
	}
}
