import { TOKEN, DIGIT, LOWERCASE, NEWLINE, NON_PRINTABLE, UPPERCASE, WHITESPACE } from '~/constants'

// § 4.2. Definitions
// https://drafts.csswg.org/css-syntax/#tokenizer-definitions

/**
 * @see https://drafts.csswg.org/css-syntax/#digit
 * @description
 * A code point between U+0030 DIGIT ZERO (0) and U+0039 DIGIT NINE (9) inclusive.
 */
export function isDigit(code: number): boolean {
	return code >= DIGIT.ZERO && code <= DIGIT.NINE
}

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

/**
 * @see https://drafts.csswg.org/css-syntax/#uppercase-letter
 * @description
 * A code point between U+0041 LATIN CAPITAL LETTER A (A) and U+005A LATIN CAPITAL LETTER Z (Z) inclusive.
 */
export function isUppercaseLetter(code: number): boolean {
	return code >= UPPERCASE.A && code <= UPPERCASE.Z
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
 * @see https://drafts.csswg.org/css-syntax/#lowercase-letter
 * @description
 * A code point between U+0061 LATIN SMALL LETTER A (a) and U+007A LATIN SMALL LETTER Z (z) inclusive.
 */
export function isLetter(code: number): boolean {
	return isUppercaseLetter(code) || isLowercaseLetter(code)
}

/**
 * @see https://drafts.csswg.org/css-syntax/#non-ascii-code-point
 * @description
 * A code point with a value equal to or greater than U+0080 <control>.
 */
export function isNonASCII(code: number): boolean {
	return code >= TOKEN.CTRL
}

/**
 * @see https://drafts.csswg.org/css-syntax/#identifier-start-code-point
 * @description identifier-start code point
 * A letter, a non-ASCII code point, or U+005F LOW LINE (_).
 */
export function isIdentifierNameStart(code: number): boolean {
	return isLetter(code) || isNonASCII(code) || code === TOKEN.LOW_LINE
}

/**
 * @see https://drafts.csswg.org/css-syntax/#identifier-code-point
 * @description identifier code point
 * A name-start code point, a digit, or U+002D HYPHEN-MINUS (-).
 */
export function isIdentifierName(code: number): boolean {
	return isIdentifierNameStart(code) || isDigit(code) || code === TOKEN.MINUS
}

/**
 * @see https://drafts.csswg.org/css-syntax/#non-printable-code-point
 * @description non-printable code point
 * A code point between U+0000 NULL and U+0008 BACKSPACE inclusive,
 * or U+000B LINE TABULATION,
 * or a code point between U+000E SHIFT OUT and U+001F INFORMATION SEPARATOR ONE inclusive,
 * or U+007F DELETE.
 */
export function isNonPrintable(code: number): boolean {
	return (
		(code >= NON_PRINTABLE.NULL && code <= NON_PRINTABLE.BACK) ||
		code === NON_PRINTABLE.LTAB ||
		(code >= NON_PRINTABLE.SHFT && code <= NON_PRINTABLE.INFO) ||
		code === NON_PRINTABLE.DELT
	)
}

/**
 * @see https://drafts.csswg.org/css-syntax/#newline
 * @description
 * U+000A LINE FEED.
 * Note that U+000D CARRIAGE RETURN and U+000C FORM FEED are not included in this definition,
 * as they are converted to U+000A LINE FEED during preprocessing.
 *
 * @note check for CR and FF because there is no pre-processing.
 */
export function isNewline(code: number): boolean {
	return code === NEWLINE.LF || code === NEWLINE.CR || code === NEWLINE.FF
}

/**
 * @see https://drafts.csswg.org/css-syntax/#whitespace
 * @description
 * A newline, U+0009 CHARACTER TABULATION, or U+0020 SPACE.
 */
export function isWhitespace(code: number): boolean {
	return isNewline(code) || code === WHITESPACE.SPC || code === WHITESPACE.TAB
}

/**
 * @see https://drafts.csswg.org/css-syntax/#starts-with-a-valid-escape
 * @description check if two code points are a valid escape
 *
 * If the first code point is not U+005C REVERSE SOLIDUS (\), return false.
 * Otherwise, if the second code point is a newline, return false.
 * Otherwise, return true.
 */
export function areValidEscape(charAt0: number, charAt1: number): boolean {
	return !(charAt0 !== TOKEN.REVERSE_SOLIDUS || isNewline(charAt1))
}

/**
 * @see https://drafts.csswg.org/css-syntax/#would-start-an-identifier
 * @description Check if three code points would start an identifier
 *
 * Look at the first code point:
 * U+002D HYPHEN-MINUS
 *  If the second code point is an identifier-start code point or a U+002D HYPHEN-MINUS,
 *  or the second and third code points are a valid escape, return true.
 *  Otherwise, return false.
 * identifier-start code point
 *  Return true.
 * U+005C REVERSE SOLIDUS (\)
 *  If the first and second code points are a valid escape, return true. Otherwise, return false.
 * anything else
 *  Return false.
 */
export function areIdentifierNameStart(charAt0: number, charAt1: number, charAt2: number): boolean {
	if (charAt0 === TOKEN.MINUS) {
		return isIdentifierNameStart(charAt1) || charAt1 === TOKEN.MINUS || areValidEscape(charAt1, charAt2)
	}
	if (isIdentifierNameStart(charAt0)) return true
	if (charAt0 === TOKEN.REVERSE_SOLIDUS) return areValidEscape(charAt0, charAt1)
	return false
}

/**
 * @see https://drafts.csswg.org/css-syntax/#starts-with-a-number
 * @description Check if three code points would start a number
 *
 * Look at the first code point:
 * U+002B PLUS SIGN (+)
 * U+002D HYPHEN-MINUS (-)
 *  If the second code point is a digit, return true.
 *  Otherwise, if the second code point is a U+002E FULL STOP (.) and the third code point is a digit, return true.
 *  Otherwise, return false.
 * U+002E FULL STOP (.)
 *  If the second code point is a digit, return true.
 *  Otherwise, return false.
 * digit
 *  Return true.
 * anything else
 *  Return false.
 */
export function areNumberStart(charAt0: number, charAt1: number, charAt2: number): boolean {
	if (charAt0 === TOKEN.MINUS || charAt0 === TOKEN.PLUS) {
		return isDigit(charAt1) || (charAt1 === TOKEN.STOP && isDigit(charAt2))
	}
	return (charAt0 === TOKEN.STOP && isDigit(charAt1)) || isDigit(charAt0)
}
