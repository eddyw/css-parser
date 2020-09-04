import { GRAMMAR_SYMB, GRAMMAR_TYPE } from '~/constants'
import { isWhitespace } from '~/syntax/definitions'
import type { GrammarTokenizerContext } from '~/shared/types'

export function getSpaces(x: GrammarTokenizerContext) {
	let open = x.shut

	while (isWhitespace(x.codeAt0)) x.consume(1)

	return {
		type: GRAMMAR_TYPE.WHITESPACE,
		symb: GRAMMAR_SYMB.WHITESPACE,
		node: x.code.slice(open, x.shut),
		spot: {
			offsetIni: open,
			offsetEnd: x.shut,
		},
	}
}
