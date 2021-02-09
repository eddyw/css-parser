import { Code } from '.'

/**
 * @see https://drafts.csswg.org/css-syntax/#digit
 * A code point between U+0030 DIGIT ZERO (0) and U+0039 DIGIT NINE (9) inclusive.
 */
export function digit(cc: number): boolean {
	return cc >= Code.DigitZero && cc <= Code.DigitNine
}

/**
 * @see https://drafts.csswg.org/css-syntax/#hex-digit
 * A digit,
 * or a code point between U+0041 LATIN CAPITAL LETTER A (A) and U+0046 LATIN CAPITAL LETTER F (F) inclusive,
 * or a code point between U+0061 LATIN SMALL LETTER A (a) and U+0066 LATIN SMALL LETTER F (f) inclusive.
 */
export function hexDigit(cc: number): boolean {
	return (
		(cc >= Code.DigitZero && cc <= Code.DigitNine) ||
		(cc >= Code.LatinCapitalLetterA && cc <= Code.LatinCapitalLetterF) ||
		(cc >= Code.LatinSmallLetterA && cc <= Code.LatinSmallLetterF)
	)
}

/**
 * @see https://drafts.csswg.org/css-syntax/#uppercase-letter
 * A code point between U+0041 LATIN CAPITAL LETTER A (A) and U+005A LATIN CAPITAL LETTER Z (Z) inclusive.
 */
export function uppercaseLetter(cc: number): boolean {
	return cc >= Code.LatinCapitalLetterA && cc <= Code.LatinCapitalLetterZ
}

/**
 * @see https://drafts.csswg.org/css-syntax/#lowercase-letter
 * A code point between U+0061 LATIN SMALL LETTER A (a) and U+007A LATIN SMALL LETTER Z (z) inclusive.
 */
export function lowercaseLetter(cc: number): boolean {
	return cc >= Code.LatinSmallLetterA && cc <= Code.LatinSmallLetterZ
}

/**
 * @see https://drafts.csswg.org/css-syntax/#letter
 * An uppercase letter or a lowercase letter.
 */
export function letter(cc: number): boolean {
	return lowercaseLetter(cc) || uppercaseLetter(cc)
}

/**
 * @see https://drafts.csswg.org/css-syntax/#non-ascii-code-point
 * A code point with a value equal to or greater than U+0080 <control>.
 */
export function nonAscii(cc: number): boolean {
	return cc >= Code.Control
}

/**
 * @see https://drafts.csswg.org/css-syntax/#identifier-start-code-point
 * A letter, a non-ASCII code point, or U+005F LOW LINE (_).
 */
export function identifierStart(cc: number): boolean {
	return letter(cc) || cc >= Code.Control || cc === Code.LowLine
}

/**
 * @see https://drafts.csswg.org/css-syntax/#identifier-code-point
 * An identifier-start code point, a digit, or U+002D HYPHEN-MINUS (-).
 */
export function identifier(cc: number): boolean {
	return identifierStart(cc) || digit(cc) || cc === Code.HyphenMinus
}

/**
 * @see https://drafts.csswg.org/css-syntax/#non-printable-code-point
 * A code point between U+0000 NULL and U+0008 BACKSPACE inclusive,
 * or U+000B LINE TABULATION,
 * or a code point between U+000E SHIFT OUT and U+001F INFORMATION SEPARATOR ONE inclusive,
 * or U+007F DELETE.
 */
export function nonPrintable(cc: number): boolean {
	return (
		(cc >= Code.Null && cc <= Code.Backspace) ||
		cc === Code.LineTabulation ||
		(cc >= Code.ShiftOut && cc <= Code.InformationSeparatorOne) ||
		cc === Code.Delete
	)
}

/**
 * @see https://drafts.csswg.org/css-syntax/#newline
 * @note we check \r and \f because we there is no preprocessing
 */
export function newline(cc: number): boolean {
	return cc === Code.LineFeed || cc === Code.CarriageReturn || cc === Code.FormFeed
}

/**
 * @see https://drafts.csswg.org/css-syntax/#whitespace
 * A newline, U+0009 CHARACTER TABULATION, or U+0020 SPACE.
 */
export function whitespace(cc: number): boolean {
	return newline(cc) || cc === Code.CharacterTabulation || cc === Code.Space
}

/**
 * @see https://drafts.csswg.org/css-syntax/#check-if-two-code-points-are-a-valid-escape
 * If the first code point is not U+005C REVERSE SOLIDUS (\), return false.
 * Otherwise, if the second code point is a newline, return false.
 * Otherwise, return true.
 */
export function twoCharsValidEscape(cc1: number, cc2: number): boolean {
	return cc1 === Code.ReverseSolidus && !(cc2 === Code.LineFeed || cc2 === Code.CarriageReturn || cc2 === Code.FormFeed)
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
export function numberStart(at0: number, at1: number, at2: number): boolean {
	if (at0 === Code.HyphenMinus || at0 === Code.PlusSign) {
		return digit(at1) || (at1 === Code.FullStop && digit(at2))
	}
	return (at0 === Code.FullStop && digit(at1)) || digit(at0)
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
export function threeCharsIdentifierStart(at0: number, at1: number, at2: number): boolean {
	if (at0 === Code.HyphenMinus) {
		return identifierStart(at1) || at1 === Code.HyphenMinus || twoCharsValidEscape(at1, at2)
	}
	if (identifierStart(at0)) return true
	if (at0 === Code.ReverseSolidus) return twoCharsValidEscape(at0, at1)
	return false
}

export function eof(cc: number): boolean {
	return cc === -1
}

export function ASCII(cc: number): boolean {
	return cc < Code.Delete
}
