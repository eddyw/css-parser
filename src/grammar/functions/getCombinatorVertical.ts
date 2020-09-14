import { TOKEN, GRAMMAR_SYMB, GRAMMAR_COMBINATOR } from '~/constants'
import type { GrammarTokenizerContext } from '~/shared/types'
import type { GrammarNodeCombinatorVerticalSingle, GrammarNodeCombinatorVerticalDouble } from '~/grammar/shared'

export function getCombinatorVertical(
	x: GrammarTokenizerContext,
): GrammarNodeCombinatorVerticalSingle | GrammarNodeCombinatorVerticalDouble {
	let open = x.shut

	x.consumeCodeAt0(TOKEN.VERTICAL_LINE)

	if (x.codeAt0 === TOKEN.VERTICAL_LINE) {
		x.consume(1)
		return {
			symb: GRAMMAR_SYMB.COMBINATOR,
			flag: GRAMMAR_COMBINATOR.VL_DOUBLE,
			spot: {
				offsetIni: open,
				offsetEnd: x.shut,
			},
		}
	}

	return {
		symb: GRAMMAR_SYMB.COMBINATOR,
		flag: GRAMMAR_COMBINATOR.VL_SINGLE,
		spot: {
			offsetIni: open,
			offsetEnd: x.shut,
		},
	}
}
