import { getNumber } from '.'
import { TOKEN } from '~/constants'
import type { GrammarTokenizerContext } from '../shared'
import type { GrammarNodeMultiplierRange } from '~/grammar/shared'

export function getMultiplierRange(x: GrammarTokenizerContext): GrammarNodeMultiplierRange {
	const spot = x.getPositionOpen()

	x.consumeCodeAt0(TOKEN.L_CURLY_BRACKET)

	let vmin = getNumber(x, false)
	let vmax: typeof vmin | null = null

	if (x.codeAt0 === (TOKEN.COMMA as number)) {
		x.consume(1)
		if (x.codeAt0 !== TOKEN.R_CURLY_BRACKET) {
			vmax = getNumber(x, false)
		}
	} else {
		vmax = vmin
	}

	x.consumeCodeAt0(TOKEN.R_CURLY_BRACKET)

	return {
		vmin: vmin.repr,
		vmax: vmax == null ? 0 : vmax.repr,
		spot: x.getPositionShut(spot),
	}
}
