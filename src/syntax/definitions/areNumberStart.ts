import { TOKEN } from '~/constants'
import { isDigit } from '.'

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
