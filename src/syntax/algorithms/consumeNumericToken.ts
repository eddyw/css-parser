import { TOKEN, SYNTAX_SYMB, SYNTAX_TYPE } from '~/constants'
import { areIdentifierNameStart } from '~/syntax/definitions'
import { consumeNumber, consumeIdentifier } from '.'
import type { SyntaxTokenizerContext, CSSNumber, CSSDimension, CSSPercentage } from '~/shared/types'

/**
 * @see https://drafts.csswg.org/css-syntax/#consume-numeric-token
 * @description § 4.3.3. Consume a numeric token
 * This section describes how to consume a numeric token from a stream of code points.
 * It returns either a <number-token>, <percentage-token>, or <dimension-token>.
 *
 * Consume a number and let number be the result.
 *
 * If the next 3 input code points would start an identifier, then:
 * 	1. Create a <dimension-token> with the same value and type flag as number, and a unit set initially to the empty string.
 * 	2. Consume an identifier. Set the <dimension-token>’s unit to the returned value.
 * 	3. Return the <dimension-token>.
 *
 * Otherwise, if the next input code point is U+0025 PERCENTAGE SIGN (%), consume it.
 * 	Create a <percentage-token> with the same value as number, and return it.
 *
 * Otherwise, create a <number-token> with the same value and type flag as number, and return it.
 */
export function consumeNumericToken(
	x: SyntaxTokenizerContext,
): Readonly<CSSNumber> | Readonly<CSSDimension> | Readonly<CSSPercentage> {
	consumeNumber(x)

	if (areIdentifierNameStart(x.codeAt0, x.codeAt1, x.codeAt2)) {
		const identStart = x.shut
		consumeIdentifier(x)
		x.tail = x.shut - identStart

		return {
			type: SYNTAX_TYPE.DIMENSION_TOKEN,
			symb: SYNTAX_SYMB.DIMENSION_TOKEN,
			flag: x.flag,
			node: x.code.slice(x.open, x.shut - x.tail),
			unit: x.code.slice(x.shut - x.tail, x.shut),
			spot: {
				offsetIni: x.open,
				offsetEnd: x.shut,
			},
		}
	} else if (x.codeAt0 === TOKEN.PERCENTAGE) {
		x.shut += 1
		x.tail = 1

		return {
			type: SYNTAX_TYPE.PERCENTAGE_TOKEN,
			symb: SYNTAX_SYMB.PERCENTAGE_TOKEN,
			flag: x.flag,
			node: x.code.slice(x.open, x.shut - x.tail),
			unit: '%',
			spot: {
				offsetIni: x.open,
				offsetEnd: x.shut,
			},
		}
	}

	return {
		type: SYNTAX_TYPE.NUMBER_TOKEN,
		symb: SYNTAX_SYMB.NUMBER_TOKEN,
		flag: x.flag,
		node: x.code.slice(x.open, x.shut - x.tail),
		unit: '',
		spot: {
			offsetIni: x.open,
			offsetEnd: x.shut,
		},
	}
}
