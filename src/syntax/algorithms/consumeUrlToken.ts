import { TOKEN, NODE_SYMB, FLAG_URL } from '~/constants'
import { areValidEscape, isNonPrintable, isWhitespace } from '~/syntax/definitions'
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
	x.type = NODE_SYMB.URL_TOKEN

	while (isWhitespace(x.codeAt0)) {
		x.shut += 1
		x.setCodeAtCurrent()
	}

	do {
		x.setCodeAtCurrent()
		if (x.codeAt0 === TOKEN.R_PARENTHESIS) {
			x.shut += 1
			x.tail = 1
			break
		} else if (x.codeAt0 === TOKEN.EOF) {
			x.type = NODE_SYMB.URL_TOKEN
			x.flag |= FLAG_URL.PARSE_ERROR | FLAG_URL.END_IS_EOF
			break
		} else if (isWhitespace(x.codeAt0)) {
			do {
				x.shut += 1
				x.setCodeAtCurrent()
			} while (isWhitespace(x.codeAt0))

			if (x.codeAt0 === TOKEN.R_PARENTHESIS) {
				x.shut += 1
				x.tail = 1
				break
			} else if (x.codeAt0 === TOKEN.EOF) {
				x.flag |= FLAG_URL.PARSE_ERROR
				break
			}

			consumeBadUrlRemnants(x)
			x.type = NODE_SYMB.URL_TOKEN
			x.flag |= FLAG_URL.BAD_URL
			break
		} else if (
			x.codeAt0 === TOKEN.DOUBLE_QUOTE ||
			x.codeAt0 === TOKEN.SINGLE_QUOTE ||
			x.codeAt0 === TOKEN.L_PARENTHESIS ||
			isNonPrintable(x.codeAt0)
		) {
			consumeBadUrlRemnants(x)
			x.type = NODE_SYMB.URL_TOKEN
			x.flag |= FLAG_URL.PARSE_ERROR | FLAG_URL.BAD_URL | FLAG_URL.NON_PRINTABLE
			break
		} else if (x.codeAt0 === TOKEN.REVERSE_SOLIDUS) {
			if (areValidEscape(x.codeAt0, x.codeAt1)) {
				x.shut += 1 // Consume current & next input code point « U+005C REVERSE SOLIDUS (\) »
				x.setCodeAtCurrent()
				consumeEscapedCodePoint(x)
			} else {
				consumeBadUrlRemnants(x)
				x.type = NODE_SYMB.URL_TOKEN
				x.flag |= FLAG_URL.PARSE_ERROR | FLAG_URL.BAD_URL | FLAG_URL.BAD_ESCAPE
				break
			}
		} else {
			x.shut += 1
		}
	} while (true)

	x.setCodeAtCurrent()
}
