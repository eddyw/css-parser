import { GRAMMAR_SYMB } from '~/constants'
import { isWhitespace, isNewline } from '~/syntax/definitions'
import type { GrammarTokenizerContext } from '../shared'
import type { GrammarNodeSpace } from '~/grammar/shared'

export function getSpaces(x: GrammarTokenizerContext): GrammarNodeSpace {
	const spot = x.getPositionOpen()

	// while (isWhitespace(x.codeAt0)) x.consume(1)
	while (isWhitespace(x.codeAt0)) {
		if (isNewline(x.codeAt0)) x.consumeLn()
		else x.consume(1)
	}

	return {
		symb: GRAMMAR_SYMB.WHITESPACE,
		node: x.code.slice(spot.offIni, x.shut),
		spot: x.getPositionShut(spot),
	}
}
