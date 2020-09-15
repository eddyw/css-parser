import { TOKEN, GRAMMAR_SYMB, GRAMMAR_COMBINATOR } from '~/constants'
import type { GrammarTokenizerContext } from '../shared'
import type { GrammarNodeCombinatorVerticalSingle, GrammarNodeCombinatorVerticalDouble } from '~/grammar/shared'

export function getCombinatorVertical(
	x: GrammarTokenizerContext,
): GrammarNodeCombinatorVerticalSingle | GrammarNodeCombinatorVerticalDouble {
	const spot = x.getPositionOpen()

	x.consumeCodeAt0(TOKEN.VERTICAL_LINE)

	if (x.codeAt0 === TOKEN.VERTICAL_LINE) {
		x.consume(1)
		return {
			symb: GRAMMAR_SYMB.COMBINATOR,
			flag: GRAMMAR_COMBINATOR.VL_DOUBLE,
			spot: x.getPositionShut(spot),
		}
	}

	return {
		symb: GRAMMAR_SYMB.COMBINATOR,
		flag: GRAMMAR_COMBINATOR.VL_SINGLE,
		spot: x.getPositionShut(spot),
	}
}
