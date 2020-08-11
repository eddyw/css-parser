import { TOKEN, TYPE, FLAGS_ALL } from '~/constants'
import { areValidEscape, isNonPrintable, isWhitespace } from '~/tokenizer/definitions'
import { consumeBadUrlRemnants, consumeEscapedCodePoint } from '.'
import type { TokenizerContext } from '~/shared/types'

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
export function consumeUrlToken(x: TokenizerContext): void {
	x.tokenType = TYPE.URL

	while (isWhitespace(x.charAt1)) {
		x.tokenShut += 1
		x.setCodePointAtCurrent()
	}

	for (; x.tokenShut < x.sourceSize; x.tokenShut++) {
		x.setCodePointAtCurrent()
		if (x.charAt1 === TOKEN.R_PARENTHESIS) {
			x.tokenShut += 1
			x.tokenTail = 1
			break
		} else if (x.charAt1 === TOKEN.EOF) {
			x.tokenType = TYPE.URL_BAD
			x.tokenFlag |= FLAGS_ALL.IS_PARSE_ERROR
			break
		} else if (isWhitespace(x.charAt1)) {
			do {
				x.tokenShut += 1
				x.setCodePointAtCurrent()
			} while (isWhitespace(x.charAt1))

			if (x.charAt1 === TOKEN.R_PARENTHESIS) {
				x.tokenShut += 1
				x.tokenTail = 1
				break
			} else if (x.charAt1 === TOKEN.EOF) {
				x.tokenFlag |= FLAGS_ALL.IS_PARSE_ERROR
				break
			}

			consumeBadUrlRemnants(x)
			x.tokenType = TYPE.URL_BAD
			break
		} else if (
			x.charAt1 === TOKEN.DOUBLE_QUOTE ||
			x.charAt1 === TOKEN.SINGLE_QUOTE ||
			x.charAt1 === TOKEN.L_PARENTHESIS ||
			isNonPrintable(x.charAt1)
		) {
			consumeBadUrlRemnants(x)
			x.tokenType = TYPE.URL_BAD
			x.tokenFlag |= FLAGS_ALL.IS_PARSE_ERROR
			break
		} else if (x.charAt1 === TOKEN.REVERSE_SOLIDUS) {
			if (areValidEscape(x.charAt1, x.charAt2)) {
				x.tokenShut += 2 // Consume current & next input code point « U+005C REVERSE SOLIDUS (\) »
				x.setCodePointAtCurrent()
				consumeEscapedCodePoint(x)
			} else {
				consumeBadUrlRemnants(x)
				x.tokenType = TYPE.URL_BAD
				x.tokenFlag |= FLAGS_ALL.IS_PARSE_ERROR
				break
			}
		}
	}
}
