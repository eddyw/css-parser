import { TOKEN, GRAMMAR_SYMB } from '~/constants'
import { getGroupContents } from '.'
import type { GrammarTokenizerContext } from '~/shared/types'
import type { GrammarNodeGroup } from '~/grammar/shared'

export function getGroupBrackets(x: GrammarTokenizerContext, root: boolean = false): GrammarNodeGroup {
	const open = x.shut
	const tail = root ? 0 : TOKEN.R_SQUARE_BRACKET

	if (!root) {
		x.consumeCodeAt0(TOKEN.L_SQUARE_BRACKET)
	}

	const group = getGroupContents(x, tail)

	return {
		symb: GRAMMAR_SYMB.GROUP,
		body: group.body,
		comb: group.comb,
		root: group.root,
		void: group.void,
		spot: x.getSpot(open, x.shut),
	}
}
