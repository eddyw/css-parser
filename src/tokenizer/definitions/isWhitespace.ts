import { WHITESPACE } from '~/constants'
import { isNewline } from '.'

/**
 * @see https://drafts.csswg.org/css-syntax/#whitespace
 * @description
 * A newline, U+0009 CHARACTER TABULATION, or U+0020 SPACE.
 */
export function isWhitespace(code: number): boolean {
	return (
		isNewline(code) || code === WHITESPACE.SPC || code === WHITESPACE.TAB
	)
}
