import { NON_PRINTABLE } from '~/constants'

/**
 * @see https://drafts.csswg.org/css-syntax/#non-printable-code-point
 * @description non-printable code point
 * A code point between U+0000 NULL and U+0008 BACKSPACE inclusive,
 * or U+000B LINE TABULATION,
 * or a code point between U+000E SHIFT OUT and U+001F INFORMATION SEPARATOR ONE inclusive,
 * or U+007F DELETE.
 */
export function isNonPrintable(code: number): boolean {
	return (
		(code >= NON_PRINTABLE.NULL && code <= NON_PRINTABLE.BACK) ||
		code === NON_PRINTABLE.LTAB ||
		(code >= NON_PRINTABLE.SHFT && code <= NON_PRINTABLE.INFO) ||
		code === NON_PRINTABLE.DELT
	)
}
