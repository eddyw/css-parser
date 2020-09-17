import { TOKEN } from '~/constants'
import { getKeyword } from '.'
import { SyntaxKind } from '../shared'
import type { ParserScanner, SyntaxNode } from '../shared'

export function getAtKeyword(x: ParserScanner): SyntaxNode.AtKeyword {
	const open = x.getPositionOpen()

	x.consumeAt0(TOKEN.AT)

	const word = getKeyword(x)

	return {
		type: SyntaxKind.AtKeyword,
		text: word.text,
		spot: x.getPositionShut(open),
	}
}
