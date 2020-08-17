import { TOKEN, FLAG_IDENTIFIER } from '~/constants'
import { isHexDigit, isWhitespace } from '~/tokenizer/definitions'
import type { TokenizerContext } from '~/shared/types'

/**
 * @see https://drafts.csswg.org/css-syntax/#consume-escaped-code-point
 * @see https://www.w3.org/International/questions/qa-escapes
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
export function consumeEscapedCodePoint(x: TokenizerContext): void {
	if (isHexDigit(x.codeAt0)) {
		for (let i = 1; i <= 5; i++) {
			if (isHexDigit(x.codeAt1)) {
				x.shut += 1
				x.setCodeAtCurrent()
			} else break
		}
		if (isWhitespace(x.codeAt1) && !isWhitespace(x.codeAt2)) {
			x.shut += 1
		}
		x.shut += 1
	} else if (x.codeAt0 === TOKEN.EOF) {
		x.flag |= FLAG_IDENTIFIER.PARSE_ERROR
	} else {
		x.shut += 1
	}
	x.setCodeAtCurrent()
}
