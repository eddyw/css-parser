import { UPPERCASE } from '~/constants'

/**
 * @see https://drafts.csswg.org/css-syntax/#uppercase-letter
 * @description
 * A code point between U+0041 LATIN CAPITAL LETTER A (A) and U+005A LATIN CAPITAL LETTER Z (Z) inclusive.
 */
export function isUppercaseLetter(code: number): boolean {
	return code >= UPPERCASE.A && code <= UPPERCASE.Z
}
