import { TOKEN } from '~/constants'
import { isWhitespace } from '~/syntax/definitions'
import { getSpaces, getNumber } from '.'
import type { GrammarTokenizerContext } from '../shared'
import type { GrammarNodeTypeRange } from '~/grammar/shared'

export function getTypeRange(x: GrammarTokenizerContext): GrammarNodeTypeRange {
	const spot = x.getPositionOpen()

	let vmin: number | null = null // −∞
	let vmax: number | null = null // ∞

	x.consumeCodeAt0(TOKEN.L_SQUARE_BRACKET)

	if (x.codeAt0 === TOKEN.INFINITY) {
		x.consume(1)
	} else if (x.codeAt0 === TOKEN.MINUS && x.codeAt1 === TOKEN.INFINITY) {
		x.consume(2)
	} else {
		vmin = getNumber(x, true).repr
	}

	if (isWhitespace(x.codeAt0)) getSpaces(x)

	x.consumeCodeAt0(TOKEN.COMMA)

	if (isWhitespace(x.codeAt0)) getSpaces(x)

	if (x.codeAt0 === TOKEN.INFINITY) {
		x.consume(1)
	} else if (x.codeAt0 === TOKEN.MINUS && x.codeAt1 === TOKEN.INFINITY) {
		x.consume(2)
	} else {
		vmax = getNumber(x, true).repr
	}

	x.consumeCodeAt0(TOKEN.R_SQUARE_BRACKET)

	return {
		vmin,
		vmax,
		spot: x.getPositionShut(spot),
	}
}
