import { TOKEN } from '~/constants'
import { getGroupContents } from '.'
import { ParserScanner, SyntaxNode } from '../shared'

export function getGroupBrackets(x: ParserScanner, root: boolean = false): SyntaxNode.Group {
	const shutChar = root ? 0 : TOKEN.R_SQUARE_BRACKET

	if (!root) x.consumeAt0(TOKEN.L_SQUARE_BRACKET)

	return getGroupContents(x, shutChar)
}
