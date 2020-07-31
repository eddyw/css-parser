import { TOKEN } from '~/constants'
import { areValidEscape } from '~/tokenizer/definitions'
import { consumeEscapedCodePoint } from '.'
import type { TokenizerContext } from '~/shared/context'

/**
 * @see https://drafts.csswg.org/css-syntax/#consume-number
 * @description § 4.3.12. Consume a number
 * This section describes how to consume the remnants of a bad url from a stream of code points,
 * "cleaning up" after the tokenizer realizes that it’s in the middle of a <bad-url-token> rather than a <url-token>.
 * It returns nothing; its sole use is to consume enough of the input stream to reach a recovery point where normal tokenizing can resume.
 *
 * Repeatedly consume the next input code point from the stream:
 *
 * 	U+0029 RIGHT PARENTHESIS ())
 * 	EOF
 * 		Return.
 * 	the input stream starts with a valid escape
 * 		Consume an escaped code point.
 * 		This allows an escaped right parenthesis ("\)") to be encountered without ending the <bad-url-token>.
 * 		This is otherwise identical to the "anything else" clause.
 * 	anything else
 * 		Do nothing.
 */
export function consumeBadUrlRemnants(ctx: TokenizerContext): void {
	for (; ctx.tokenShut < ctx.sourceSize; ctx.tokenShut++) {
		ctx.setCodePointAtCurrent()
		if (ctx.charAt0 === TOKEN.R_PARENTHESIS) {
			ctx.tokenShut += 1 // Consume U+0029 RIGHT PARENTHESIS ())
			break
		}
		if (areValidEscape(ctx.charAt0, ctx.charAt1)) {
			ctx.tokenShut += 1 // Consume U+005C REVERSE SOLIDUS (\)
			consumeEscapedCodePoint(ctx)
		}
	}
}
