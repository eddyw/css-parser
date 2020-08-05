import { TOKEN, LOWERCASE, FLAGS_NUMBER, UPPERCASE } from '~/constants'
import { isDigit } from '~/tokenizer/definitions'
import { consumeDigits } from '.'
import type { TokenizerContext } from '~/shared/types'

/**
 * @see https://drafts.csswg.org/css-syntax/#consume-number
 * @description § 4.3.12. Consume a number
 * 1. Initially set type to "integer". Let repr be the empty string.
 * 2. If the next input code point is U+002B PLUS SIGN (+) or U+002D HYPHEN-MINUS (-), consume it and append it to repr.
 * 3. While the next input code point is a digit, consume it and append it to repr.
 * 4. If the next 2 input code points are U+002E FULL STOP (.) followed by a digit, then:
 *    1. Consume them.
 *    2. Append them to repr.
 *    2. Set type to "number".
 *    3. While the next input code point is a digit, consume it and append it to repr.
 * 5. If the next 2 or 3 input code points are
 *  U+0045 LATIN CAPITAL LETTER E (E) or U+0065 LATIN SMALL LETTER E (e),
 *  optionally followed by U+002D HYPHEN-MINUS (-) or U+002B PLUS SIGN (+),
 *  followed by a digit, then:
 *    1. Consume them.
 *    2. Append them to repr.
 *    3. Set type to "number".
 *    4. While the next input code point is a digit, consume it and append it to repr.
 * 6. Convert repr to a number, and set the value to the returned value.
 * 7. Return value and type.
 */
export function consumeNumber(ctx: TokenizerContext): void {
	ctx.tokenFlag |= FLAGS_NUMBER.IS_INTEGER

	if (ctx.charAt0 === TOKEN.PLUS || ctx.charAt0 === TOKEN.MINUS) {
		ctx.tokenShut += 1 // Consume (+) or (-)
	}
	consumeDigits(ctx)

	if (ctx.charAt0 === TOKEN.STOP && isDigit(ctx.charAt1)) {
		ctx.tokenShut += 2 // Consume (.[digit])
		ctx.tokenFlag |= FLAGS_NUMBER.IS_DOUBLE
		ctx.tokenFlag = ~(~ctx.tokenFlag | FLAGS_NUMBER.IS_INTEGER) // Unset IS_INTEGER
		consumeDigits(ctx)
	}

	if (
		(ctx.charAt0 === UPPERCASE.E || ctx.charAt0 === LOWERCASE.E) &&
		((isDigit(ctx.charAt1) && ctx.tokenShut++) || // Consume (E|e)
			((ctx.charAt1 === TOKEN.PLUS || ctx.charAt1 === TOKEN.MINUS) &&
			isDigit(ctx.charAt2) &&
			ctx.tokenShut++ && // Consume (E|e)
				ctx.tokenShut++)) // Consume (+|-)
	) {
		ctx.tokenShut += 1 // Consume ([digit])
		ctx.tokenFlag |= FLAGS_NUMBER.IS_DOUBLE
		consumeDigits(ctx)
	}
}
