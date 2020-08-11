import { TOKEN, TYPE, LOWERCASE, UPPERCASE } from '~/constants'
import { consumeIdentifier, consumeUrlToken } from '.'
import type { TokenizerContext } from '~/shared/types'
import { isWhitespace } from '../definitions'

/**
 * @see https://drafts.csswg.org/css-syntax/#consume-ident-like-token
 * @description § 4.3.4. Consume an ident-like token
 * This section describes how to consume an ident-like token from a stream of code points.
 * It returns an <ident-token>, <function-token>, <url-token>, or <bad-url-token>.
 *
 * Consume an identifier, and let string be the result.
 *
 * If string’s value is an ASCII case-insensitive match for "url",
 * and the next input code point is U+0028 LEFT PARENTHESIS ((),
 * consume it.
 *
 * While the next two input code points are whitespace, consume the next input code point.
 *
 * If the next one or two input code points are
 * 		U+0022 QUOTATION MARK ("), U+0027 APOSTROPHE ('),
 * 		or whitespace followed by U+0022 QUOTATION MARK (") or U+0027 APOSTROPHE ('),
 * then create a <function-token> with its value set to string and return it.
 * Otherwise, consume a url token, and return it.
 *
 * Otherwise, if the next input code point is U+0028 LEFT PARENTHESIS ((), consume it.
 * Create a <function-token> with its value set to string and return it.
 *
 * Otherwise, create an <ident-token> with its value set to string and return it.
 */
export function consumeIdentLikeToken(x: TokenizerContext): void {
	if (
		(x.charAt0 === (LOWERCASE.U as number) || x.charAt0 === (UPPERCASE.U as number)) &&
		(x.charAt1 === (LOWERCASE.R as number) || x.charAt1 === (UPPERCASE.R as number)) &&
		(x.charAt2 === (LOWERCASE.L as number) || x.charAt2 === (UPPERCASE.L as number)) &&
		x.charAt3 === (TOKEN.L_PARENTHESIS as number)
	) {
		x.tokenShut += 4 // Consume « url( » (case-sensitive)
		x.setCodePointAtCurrent()

		let restoreTokenPosition = x.tokenShut

		while (isWhitespace(x.charAt1) && isWhitespace(x.charAt2)) {
			x.tokenShut += 1
			x.setCodePointAtCurrent()
		}

		if (
			x.charAt1 === TOKEN.SINGLE_QUOTE ||
			x.charAt1 === TOKEN.DOUBLE_QUOTE ||
			(isWhitespace(x.charAt1) && (x.charAt2 === TOKEN.SINGLE_QUOTE || x.charAt2 === TOKEN.DOUBLE_QUOTE))
		) {
			x.tokenType = TYPE.FUNCTION
			x.tokenTail = 2
			x.tokenShut = restoreTokenPosition
			x.setCodePointAtCurrent()
			return
		}

		consumeUrlToken(x)
		return
	}

	consumeIdentifier(x)

	if (x.charAt1 === TOKEN.L_PARENTHESIS) {
		x.tokenType = TYPE.FUNCTION
		x.tokenShut += 1
		return
	}

	x.tokenType = TYPE.IDENTIFIER
}
