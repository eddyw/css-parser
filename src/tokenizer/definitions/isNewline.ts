import { NEWLINE } from '~/constants'

/**
 * @see https://drafts.csswg.org/css-syntax/#newline
 * @description
 * U+000A LINE FEED.
 * Note that U+000D CARRIAGE RETURN and U+000C FORM FEED are not included in this definition,
 * as they are converted to U+000A LINE FEED during preprocessing.
 */
export function isNewline(code: number): boolean {
	return code === NEWLINE.LF
}
