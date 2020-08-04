import { TOKEN } from '~/constants'
import { isIdentifierStartCodePoint, areValidEscape } from '.'

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
		return isIdentifierStartCodePoint(charAt1) || charAt1 === TOKEN.MINUS || areValidEscape(charAt1, charAt2)
	}
	if (isIdentifierStartCodePoint(charAt0)) return true
	if (charAt0 === TOKEN.REVERSE_SOLIDUS) return areValidEscape(charAt0, charAt1)
	return false
}
