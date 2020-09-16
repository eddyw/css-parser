import { TOKEN } from '~/constants'
import { getGroupContents } from '.'
import type { GrammarTokenizerContext, GrammarNodeGroup } from '../shared'

export function getGroupFunction(x: GrammarTokenizerContext): GrammarNodeGroup {
	x.consumeCodeAt0(TOKEN.L_PARENTHESIS)

	return getGroupContents(x, TOKEN.R_PARENTHESIS)
}
