import { DIGIT } from '~/constants'

/**
 * @see https://drafts.csswg.org/css-syntax/#digit
 * @description
 * A code point between U+0030 DIGIT ZERO (0) and U+0039 DIGIT NINE (9) inclusive.
 */
export function isDigit(code: number): boolean {
	return code >= DIGIT.ZERO && code <= DIGIT.NINE
}
