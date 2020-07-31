import { TOKEN } from '~/constants'
import { isNewline } from '.'

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
