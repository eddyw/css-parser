import { LOWERCASE } from '~/constants'

/**
 * @see https://drafts.csswg.org/css-syntax/#lowercase-letter
 * @description
 * A code point between U+0061 LATIN SMALL LETTER A (a) and U+007A LATIN SMALL LETTER Z (z) inclusive.
 */
export function isLowercaseLetter(code: number): boolean {
	return code >= LOWERCASE.A && code <= LOWERCASE.Z
}
