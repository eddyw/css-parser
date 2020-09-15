import { TOKEN } from '~/constants'
import { getGroupContents } from '.'
import type { GrammarNodeGroup, GrammarTokenizerContext } from '../shared'

export function getGroupBrackets(x: GrammarTokenizerContext, root: boolean = false): GrammarNodeGroup {
	const shutChar = root ? 0 : TOKEN.R_SQUARE_BRACKET

	if (!root) x.consumeCodeAt0(TOKEN.L_SQUARE_BRACKET)

	return getGroupContents(x, shutChar)
}
