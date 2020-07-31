import { TOKEN } from '~/constants'
import { isDigit, isIdentifierNameStart } from '.'

/**
 * @see https://drafts.csswg.org/css-syntax/#identifier-code-point
 * @description identifier code point
 * A name-start code point, a digit, or U+002D HYPHEN-MINUS (-).
 */
export function isIdentifierName(code: number): boolean {
	return isIdentifierNameStart(code) || isDigit(code) || code === TOKEN.MINUS
}
