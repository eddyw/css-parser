import { TOKEN, TYPE, LOWERCASE } from '~/constants'
import { consumeIdentifier, consumeWhitespace, consumeUrlToken } from '.'
import type { TokenizerContext } from '~/shared/context'

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
 * While the next two input code points are whitespace, consume the next input code point.
 * If the next one or two input code points are
 * 	U+0022 QUOTATION MARK ("), U+0027 APOSTROPHE ('),
 * 	or whitespace followed by U+0022 QUOTATION MARK (") or U+0027 APOSTROPHE ('),
 * then create a <function-token> with its value set to string and return it.
 * Otherwise, consume a url token, and return it.
 *
 * Otherwise, if the next input code point is U+0028 LEFT PARENTHESIS ((), consume it.
 * Create a <function-token> with its value set to string and return it.
 *
 * Otherwise, create an <ident-token> with its value set to string and return it.
 */
export function consumeIdentLikeToken(ctx: TokenizerContext): void {
	if (
		ctx.charAt0 === (LOWERCASE.U as number) &&
		ctx.charAt1 === (LOWERCASE.R as number) &&
		ctx.charAt2 === (LOWERCASE.L as number) &&
		ctx.charAt3 === (TOKEN.L_PARENTHESIS as number)
	) {
		ctx.tokenLead = 4
		ctx.tokenShut += 4 // Consume ( url( )
		consumeWhitespace(ctx)
		if (ctx.charAt0 === TOKEN.DOUBLE_QUOTE || ctx.charAt0 === TOKEN.SINGLE_QUOTE) {
			ctx.tokenType = TYPE.FUNCTION
			ctx.tokenShut += 1
			return
		}
		consumeUrlToken(ctx)
		return
	}

	consumeIdentifier(ctx)

	if (ctx.charAt0 === TOKEN.L_PARENTHESIS) {
		ctx.tokenType = TYPE.FUNCTION
		ctx.tokenShut += 1
		return
	}

	ctx.tokenType = TYPE.IDENTIFIER
}
