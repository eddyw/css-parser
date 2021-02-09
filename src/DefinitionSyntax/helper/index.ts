import { TOKEN, DIGIT, LOWERCASE, UPPERCASE, NEWLINE, WHITESPACE } from '~/constants'

/**
 * @see https://drafts.csswg.org/css-syntax/#digit
 * @description
 * A code point between U+0030 DIGIT ZERO (0) and U+0039 DIGIT NINE (9) inclusive.
 */
export function isDigit(code: number): boolean {
	return code >= DIGIT.ZERO && code <= DIGIT.NINE
}

/**
 * @see https://drafts.csswg.org/css-syntax/#lowercase-letter
 * @description
 * A code point between U+0061 LATIN SMALL LETTER A (a) and U+007A LATIN SMALL LETTER Z (z) inclusive.
 */
export function isLetter(code: number): boolean {
	return isUppercaseLetter(code) || isLowercaseLetter(code)
}

/**
 * @see https://drafts.csswg.org/css-syntax/#lowercase-letter
 * @description
 * A code point between U+0061 LATIN SMALL LETTER A (a) and U+007A LATIN SMALL LETTER Z (z) inclusive.
 */
export function isLowercaseLetter(code: number): boolean {
	return code >= LOWERCASE.A && code <= LOWERCASE.Z
}

/**
 * @see https://drafts.csswg.org/css-syntax/#uppercase-letter
 * @description
 * A code point between U+0041 LATIN CAPITAL LETTER A (A) and U+005A LATIN CAPITAL LETTER Z (Z) inclusive.
 */
export function isUppercaseLetter(code: number): boolean {
	return code >= UPPERCASE.A && code <= UPPERCASE.Z
}

/**
 * @see https://drafts.csswg.org/css-syntax/#newline
 * @description
 * U+000A LINE FEED.
 * Note that U+000D CARRIAGE RETURN and U+000C FORM FEED are not included in this definition,
 * as they are converted to U+000A LINE FEED during preprocessing.
 */
export function isNewline(code: number): boolean {
	return code === NEWLINE.LF
}

/**
 * @see https://drafts.csswg.org/css-syntax/#whitespace
 * @description
 * A newline, U+0009 CHARACTER TABULATION, or U+0020 SPACE.
 */
export function isWhitespace(code: number): boolean {
	return isNewline(code) || code === WHITESPACE.SPC || code === WHITESPACE.TAB
}

export function isKeywordChar(code: number): boolean {
	return isLetter(code) || isDigit(code) || code === TOKEN.MINUS
}
