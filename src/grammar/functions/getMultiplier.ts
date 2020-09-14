import { GRAMMAR_SYMB, GRAMMAR_TYPE, TOKEN } from '~/constants'
import { getMultiplierRange } from '.'
import type { GrammarTokenizerContext } from '~/shared/types'
import type { GrammarNodeMultiplier, GrammarNodeMultiplierRequired } from '~/grammar/shared'

const MORE = 65535 // Sane default? (unsigned small int)

/**
 * Multiplier for type, word, or group
 */
export function getMultiplier(
	x: GrammarTokenizerContext,
): GrammarNodeMultiplier | GrammarNodeMultiplierRequired | null {
	const open = x.shut
	const range = {
		vmin: -1,
		vmax: -1,
		hash: false,
	}

	switch (x.codeAt0) {
		case TOKEN.ASTERISK: {
			x.consume(1)
			range.vmax = 0 // 0 or
			range.vmin = MORE // more times
			break
		}
		case TOKEN.PLUS: {
			x.consume(1)
			range.vmin = 1 // 1 or
			range.vmax = MORE // more times
			break
		}
		case TOKEN.QUESTION: {
			x.consume(1)
			range.vmin = 0 // 0 or
			range.vmax = 1 // 1 times
			break
		}
		case TOKEN.HASH: {
			x.consume(1)
			range.hash = true // Separated by comma

			if (x.codeAt0 === (TOKEN.L_CURLY_BRACKET as number)) {
				const node = getMultiplierRange(x)
				range.vmin = node.vmin
				range.vmax = node.vmax
			} else {
				range.vmin = 1 // 1 or
				range.vmax = MORE // more times
			}
			break
		}
		case TOKEN.L_CURLY_BRACKET: {
			const node = getMultiplierRange(x)
			range.vmin = node.vmin
			range.vmax = node.vmax
			break
		}
		case TOKEN.EXCLAMATION: {
			x.consume(1)
			return {
				type: GRAMMAR_TYPE.REQUIRED,
				symb: GRAMMAR_SYMB.REQUIRED,
				node: null,
				spot: {
					offsetIni: open,
					offsetEnd: x.shut,
				},
			}
		}
		default: {
			return null
		}
	}

	return {
		type: GRAMMAR_TYPE.MULTIPLIER,
		symb: GRAMMAR_SYMB.MULTIPLIER,
		vmin: range.vmin,
		vmax: range.vmax,
		hash: range.hash,
		node: null,
		spot: {
			offsetIni: open,
			offsetEnd: x.shut,
		},
	}
}
