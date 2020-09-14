import { GRAMMAR_SYMB, GRAMMAR_TYPE, GRAMMAR_COMBINATOR } from '~/constants'
import type { GrammarNodeCombinatorJuxtapose, GrammarNodeSpace } from '~/grammar/shared'

export function getCombinatorJuxtaposeFromSpace(spaceNode: GrammarNodeSpace): GrammarNodeCombinatorJuxtapose {
	return {
		type: GRAMMAR_TYPE.COMBINATOR,
		symb: GRAMMAR_SYMB.COMBINATOR,
		flag: GRAMMAR_COMBINATOR.JUXTAPOSE,
		spot: spaceNode.spot,
	}
}
