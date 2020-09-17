import { TOKEN } from '~/constants'
import { isWhitespace } from '~/syntax/definitions'
import { getSpace, getNumber } from '.'
import { ParserScanner, SyntaxPartial } from '../shared'

export function getPropertyTypeRange(x: ParserScanner): SyntaxPartial.PropertyTypeRange {
	const spot = x.getPositionOpen()

	let vmin: number | null = null // −∞
	let vmax: number | null = null // ∞

	x.consumeAt0(TOKEN.L_SQUARE_BRACKET)

	if (x.at0 === TOKEN.INFINITY) {
		x.consume(1)
	} else if (x.at0 === TOKEN.MINUS && x.at1 === TOKEN.INFINITY) {
		x.consume(2)
	} else {
		vmin = getNumber(x, true).repr
	}

	if (isWhitespace(x.at0)) getSpace(x)

	x.consumeAt0(TOKEN.COMMA)

	if (isWhitespace(x.at0)) getSpace(x)

	if (x.at0 === TOKEN.INFINITY) {
		x.consume(1)
	} else if (x.at0 === TOKEN.MINUS && x.at1 === TOKEN.INFINITY) {
		x.consume(2)
	} else {
		vmax = getNumber(x, true).repr
	}

	x.consumeAt0(TOKEN.R_SQUARE_BRACKET)

	return {
		vmin,
		vmax,
		spot: x.getPositionShut(spot),
	}
}
