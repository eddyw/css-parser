import { TOKEN, TYPE, FLAGS_ALL } from '~/constants'
import { areValidEscape, isNonPrintable } from '~/tokenizer/definitions'
import { consumeWhitespace, consumeBadUrlRemnants, consumeEscapedCodePoint } from '.'
import type { TokenizerContext } from '~/shared/context'

/**
 * @see https://drafts.csswg.org/css-syntax/#consume-url-token
 * @description § 4.3.6. Consume a url token
 * This section describes how to consume a url token from a stream of code points.
 * It returns either a <url-token> or a <bad-url-token>.
 *
 * @note This algorithm assumes that the initial "url(" has already been consumed.
 * This algorithm also assumes that it’s being called to consume an "unquoted" value, like url(foo).
 * A quoted value, like url("foo"), is parsed as a <function-token>.
 * Consume an ident-like token automatically handles this distinction;
 * this algorithm shouldn’t be called directly otherwise.
 *
 * 1. Initially create a <url-token> with its value set to the empty string.
 * 2. Consume as much whitespace as possible.
 * 3. Repeatedly consume the next input code point from the stream:
 * 		U+0029 RIGHT PARENTHESIS ())
 * 			Return the <url-token>.
 * 		EOF
 * 			This is a parse error. Return the <url-token>.
 * 		whitespace
 * 			Consume as much whitespace as possible.
 * 			If the next input code point is U+0029 RIGHT PARENTHESIS ()) or EOF,
 * 			consume it and return the <url-token> (if EOF was encountered, this is a parse error);
 * 			otherwise, consume the remnants of a bad url, create a <bad-url-token>, and return it.
 * 		U+0022 QUOTATION MARK (")
 * 		U+0027 APOSTROPHE (')
 * 		U+0028 LEFT PARENTHESIS (()
 * 		non-printable code point
 * 			This is a parse error. Consume the remnants of a bad url, create a <bad-url-token>, and return it.
 * 		U+005C REVERSE SOLIDUS (\)
 * 			If the stream starts with a valid escape,
 * 			consume an escaped code point and append the returned code point to the <url-token>’s value.
 * 			Otherwise, this is a parse error. Consume the remnants of a bad url, create a <bad-url-token>, and return it.
 * 		anything else
 * 			Append the current input code point to the <url-token>’s value.
 */
export function consumeUrlToken(ctx: TokenizerContext): void {
	ctx.tokenType = TYPE.URL

	consumeWhitespace(ctx)

	for (; ctx.tokenShut <= ctx.sourceSize; ctx.tokenShut++) {
		ctx.setCodePointAtCurrent()
		if (ctx.charAt0 === TOKEN.R_PARENTHESIS) {
			ctx.tokenShut += 1
			ctx.tokenTail = 1
			break
		} else if (ctx.charAt0 === TOKEN.EOF) {
			ctx.tokenShut -= 1
			ctx.tokenType = TYPE.URL_BAD
			ctx.tokenFlag |= FLAGS_ALL.IS_PARSE_ERROR
			break
		} else if (
			ctx.charAt0 === TOKEN.DOUBLE_QUOTE ||
			ctx.charAt0 === TOKEN.SINGLE_QUOTE ||
			isNonPrintable(ctx.charAt0)
		) {
			consumeBadUrlRemnants(ctx)
			ctx.tokenType = TYPE.URL_BAD
			ctx.tokenFlag |= FLAGS_ALL.IS_PARSE_ERROR
			break
		} else if (ctx.charAt0 === TOKEN.REVERSE_SOLIDUS) {
			if (areValidEscape(ctx.charAt0, ctx.charAt1)) {
				ctx.tokenShut += 1
				ctx.setCodePointAtCurrent()
				consumeEscapedCodePoint(ctx)
			} else {
				consumeBadUrlRemnants(ctx)
				ctx.tokenType = TYPE.URL_BAD
				ctx.tokenFlag |= FLAGS_ALL.IS_PARSE_ERROR
				break
			}
		}
	}
}
