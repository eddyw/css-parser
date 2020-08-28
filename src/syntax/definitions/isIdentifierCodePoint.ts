import { TOKEN } from '~/constants'
import { isDigit, isIdentifierStartCodePoint } from '.'

/**
 * @see https://drafts.csswg.org/css-syntax/#identifier-code-point
 * @description identifier code point
 * An identifier-start code point, a digit, or U+002D HYPHEN-MINUS (-).
 */
export function isIdentifierCodePoint(code: number): boolean {
	return isIdentifierStartCodePoint(code) || isDigit(code) || code === TOKEN.MINUS
}
