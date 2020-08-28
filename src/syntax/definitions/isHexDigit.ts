import { DIGIT } from '~/constants'
import { isUppercaseLetter, isLowercaseLetter } from '.'

/**
 * @see https://drafts.csswg.org/css-syntax/#hex-digit
 * @description
 * A digit,
 * or a code point between U+0041 LATIN CAPITAL LETTER A (A) and U+0046 LATIN CAPITAL LETTER F (F) inclusive,
 * or a code point between U+0061 LATIN SMALL LETTER A (a) and U+0066 LATIN SMALL LETTER F (f) inclusive.
 */
export function isHexDigit(code: number): boolean {
	return (code >= DIGIT.ZERO && code <= DIGIT.NINE) || isUppercaseLetter(code) || isLowercaseLetter(code)
}
