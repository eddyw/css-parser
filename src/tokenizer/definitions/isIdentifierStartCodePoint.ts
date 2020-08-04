import { TOKEN } from '~/constants'
import { isLetter, isNonASCII } from '.'

/**
 * @see https://drafts.csswg.org/css-syntax/#identifier-start-code-point
 * @description identifier-start code point
 * A letter, a non-ASCII code point, or U+005F LOW LINE (_).
 */
export function isIdentifierStartCodePoint(code: number): boolean {
	return isLetter(code) || isNonASCII(code) || code === TOKEN.LOW_LINE
}
