import { TOKEN, FLAGS_ALL } from '~/constants'
import { isHexDigit, isNewline, isTabOrSpace } from '~/tokenizer/definitions'
import type { TokenizerContext } from '~/shared/context'

/**
 * @see https://drafts.csswg.org/css-syntax/#consume-escaped-code-point
 * @description § 4.3.7. Consume an escaped code point
 * This section describes how to consume an escaped code point.
 * It assumes that the U+005C REVERSE SOLIDUS (\) has already been consumed
 * and that the next input code point has already been verified to be part of a valid escape.
 * It will return a code point.
 *
 * Consume the next input code point.
 * 	hex digit
 * 		Consume as many hex digits as possible,
 * 		but no more than 5. Note that this means 1-6 hex digits have been consumed in total.
 * 		If the next input code point is whitespace, consume it as well.
 * 		Interpret the hex digits as a hexadecimal number.
 * 		If this number is zero, or is for a surrogate,
 * 		or is greater than the maximum allowed code point,
 * 		return U+FFFD REPLACEMENT CHARACTER (�). Otherwise,
 * 		return the code point with that value.
 * 	EOF
 * 		This is a parse error. Return U+FFFD REPLACEMENT CHARACTER (�).
 * 	anything else
 * 		Return the current input code point.
 */
export function consumeEscapedCodePoint(ctx: TokenizerContext): void {
	if (isHexDigit(ctx.charAt0)) {
		ctx.tokenShut += 1 // Consume «hex digit»
		ctx.tokenColumnShut += 1

		for (let i = 0; ctx.tokenShut < ctx.sourceSize && i < 5; ctx.tokenShut++, i++, ctx.tokenColumnShut++) {
			ctx.setCodePointAtCurrent()
			if (!isHexDigit(ctx.charAt0)) break
		}

		if (isNewline(ctx.charAt0)) {
			ctx.tokenShut += 1 // Consume « new line »
			ctx.setLineAtCurrent()
		} else if (isTabOrSpace(ctx.charAt0)) {
			ctx.tokenShut += 1
			ctx.tokenColumnShut += 1
		}
		return
	} else if (ctx.charAt0 === TOKEN.EOF) {
		ctx.tokenFlag |= FLAGS_ALL.IS_PARSE_ERROR
		return
	}

	ctx.tokenShut += 1
	ctx.tokenColumnShut += 1
}
