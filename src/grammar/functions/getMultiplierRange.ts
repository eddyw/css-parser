import { getNumber } from '.'
import { TOKEN } from '~/constants'
import { ParserScanner, SyntaxPartial } from '../shared'

export function getMultiplierRange(x: ParserScanner): SyntaxPartial.MultiplierRange {
	const spot = x.getPositionOpen()

	x.consumeAt0(TOKEN.L_CURLY_BRACKET)

	let vmin = getNumber(x, false)
	let vmax: typeof vmin | null = null

	if (x.at0 === (TOKEN.COMMA as number)) {
		x.consume(1)
		if (x.at0 !== TOKEN.R_CURLY_BRACKET) {
			vmax = getNumber(x, false)
		}
	} else {
		vmax = vmin
	}

	x.consumeAt0(TOKEN.R_CURLY_BRACKET)

	return {
		vmin: vmin.repr,
		vmax: vmax == null ? 0 : vmax.repr,
		spot: x.getPositionShut(spot),
	}
}
