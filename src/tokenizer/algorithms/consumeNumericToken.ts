import { TOKEN, TYPE } from '~/constants'
import { areIdentifierNameStart } from '~/tokenizer/definitions'
import { consumeNumber, consumeIdentifier } from '.'
import type { TokenizerContext } from '~/shared/context'

/**
 * @see https://drafts.csswg.org/css-syntax/#consume-numeric-token
 * @description § 4.3.3. Consume a numeric token
 * This section describes how to consume a numeric token from a stream of code points.
 * It returns either a <number-token>, <percentage-token>, or <dimension-token>.
 *
 * Consume a number and let number be the result.
 *
 * If the next 3 input code points would start an identifier, then:
 * 	1. Create a <dimension-token> with the same value and type flag as number, and a unit set initially to the empty string.
 * 	2. Consume an identifier. Set the <dimension-token>’s unit to the returned value.
 * 	3. Return the <dimension-token>.
 *
 * Otherwise, if the next input code point is U+0025 PERCENTAGE SIGN (%), consume it.
 * 	Create a <percentage-token> with the same value as number, and return it.
 *
 * Otherwise, create a <number-token> with the same value and type flag as number, and return it.
 */
export function consumeNumericToken(ctx: TokenizerContext): void {
	consumeNumber(ctx)
	if (areIdentifierNameStart(ctx.charAt0, ctx.charAt1, ctx.charAt2)) {
		ctx.tokenType = TYPE.DIMENSION
		const identStart = ctx.tokenShut
		consumeIdentifier(ctx)
		ctx.tokenTail = ctx.tokenShut - identStart
	} else if (ctx.charAt0 === TOKEN.PERCENTAGE) {
		ctx.tokenType = TYPE.PERCENTAGE
		ctx.tokenShut += 1
	} else {
		ctx.tokenType = TYPE.NUMBER
	}
}
