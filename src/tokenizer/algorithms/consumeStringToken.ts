import { TOKEN, TYPE, FLAGS_ALL } from '~/constants'
import { isNewline, areValidEscape } from '~/tokenizer/definitions'
import { consumeEscapedCodePoint } from '.'
import type { TokenizerContext } from '~/shared/context'

/**
 * @see https://drafts.csswg.org/css-syntax/#consume-string-token
 * @description § 4.3.5. Consume a string token
 * This section describes how to consume a string token from a stream of code points.
 * It returns either a <string-token> or <bad-string-token>.
 *
 * This algorithm may be called with an ending code point, which denotes the code point that ends the string.
 * If an ending code point is not specified, the current input code point is used.
 *
 * Initially create a <string-token> with its value set to the empty string.
 *
 * Repeatedly consume the next input code point from the stream:
 *
 * ending code point
 * 	Return the <string-token>.
 * EOF
 * 	This is a parse error. Return the <string-token>.
 * newline
 * 	This is a parse error. Re-consume the current input code point, create a <bad-string-token>, and return it.
 * U+005C REVERSE SOLIDUS (\)
 * 	If the next input code point is EOF, do nothing.
 * 	Otherwise, if the next input code point is a newline, consume it.
 * 	Otherwise, (the stream starts with a valid escape) consume an escaped code point and append the returned code point to the <string-token>’s value.
 *
 * anything else
 * 	Append the current input code point to the <string-token>’s value.
 */
export function consumeStringToken(ctx: TokenizerContext, endingCodePoint: number): void {
	ctx.tokenType = TYPE.STRING
	ctx.tokenLead = 1
	ctx.tokenShut += 1 // Consume « single quote | double quote »
	ctx.tokenColumnShut += 1

	for (; ctx.tokenShut <= ctx.sourceSize; ctx.tokenShut++, ctx.tokenColumnShut++) {
		ctx.setCodePointAtCurrent()
		if (ctx.charAt0 === endingCodePoint) {
			ctx.tokenShut += 1
			ctx.tokenTail = 1
			break
		} else if (ctx.charAt0 === TOKEN.EOF) {
			ctx.tokenFlag |= FLAGS_ALL.IS_PARSE_ERROR
			break
		} else if (isNewline(ctx.charAt0)) {
			ctx.tokenType = TYPE.STRING_BAD
			ctx.tokenFlag |= FLAGS_ALL.IS_PARSE_ERROR
			break
		} else if (ctx.charAt0 === TOKEN.REVERSE_SOLIDUS) {
			if (ctx.charAt1 === TOKEN.EOF) break // Do nothing
			if (isNewline(ctx.charAt1)) {
				ctx.tokenShut += 2 // Consume escaped newline (\[newline])
				ctx.setLineAtCurrent()
			} else if (areValidEscape(ctx.charAt0, ctx.charAt1)) {
				consumeEscapedCodePoint(ctx)
			}
		}
	}
}
