import { areValidEscape, isIdentifierCodePoint } from '~/syntax/definitions'
import { consumeEscapedCodePoint } from '.'
import type { TokenizerContext } from '~/shared/types'

/**
 * @see https://drafts.csswg.org/css-syntax/#consume-name
 * @description § 4.3.11. Consume an identifier
 * This section describes how to consume an identifier from a stream of code points.
 * It returns a string containing the largest name that can be formed from adjacent code points in the stream,
 * starting from the first.
 *
 * Note: This algorithm does not do the verification of the first few code points
 * that are necessary to ensure the returned code points would constitute an <ident-token>.
 * If that is the intended use, ensure that the stream starts with an identifier before calling this algorithm.
 *
 * Let result initially be an empty string.
 *
 * Repeatedly consume the next input code point from the stream:
 *
 * 	identifier code point
 * 		Append the code point to result.
 * 	the stream starts with a valid escape
 * 		Consume an escaped code point. Append the returned code point to result.
 * 	anything else
 * 		Re-consume the current input code point. Return result.
 */
export function consumeIdentifier(x: TokenizerContext): void {
	while (x.shut <= x.size) {
		x.setCodeAtCurrent()
		if (isIdentifierCodePoint(x.codeAt0)) {
			x.shut += 1
		} else if (areValidEscape(x.codeAt0, x.codeAt1)) {
			x.shut += 1
			x.setCodeAtCurrent()
			consumeEscapedCodePoint(x)
		} else break
	}
}
