import { TOKEN } from '~/constants'

/**
 * @see https://drafts.csswg.org/css-syntax/#non-ascii-code-point
 * @description
 * A code point with a value equal to or greater than U+0080 <control>.
 */
export function isNonASCII(code: number): boolean {
	return code >= TOKEN.CTRL
}
