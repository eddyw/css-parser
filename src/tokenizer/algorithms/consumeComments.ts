import { TOKEN, TYPE, FLAGS_ALL } from '~/constants'
import type { TokenizerContext } from '~/shared/context'

/**
 * @see https://drafts.csswg.org/css-syntax/#consume-comment
 * @description § 4.3.2 Consume comments
 * This section describes how to consume comments from a stream of code points.
 * It returns nothing.
 *
 * If the next two input code point are U+002F SOLIDUS (/) followed by a U+002A ASTERISK (*),
 * consume them and all following code points up to and including the first U+002A ASTERISK (*)
 * followed by a U+002F SOLIDUS (/), or up to an EOF code point. Return to the start of this step.
 *
 * If the preceding paragraph ended by consuming an EOF code point, this is a parse error.
 *
 * Return nothing.
 *
 * @note - ours
 * It assumes the next two input code points « U+002F SOLIDUS (/) followed by a U+002A ASTERISK (*) »
 * were already verified to be comment start
 */
export function consumeComments(ctx: TokenizerContext): void {
	ctx.tokenType = TYPE.COMMENT
	ctx.tokenLead = 2
	ctx.tokenShut += 2 // Consume «U+002F SOLIDUS (/) followed by a U+002A ASTERISK (*)»

	for (; ctx.tokenShut <= ctx.sourceSize; ctx.tokenShut++) {
		ctx.setCodePointAtCurrent()
		if (ctx.charAt0 === TOKEN.ASTERISK && ctx.charAt1 === TOKEN.FORWARD_SOLIDUS) {
			ctx.tokenShut += 2 // Consume «U+002A ASTERISK (*) followed by a U+002F SOLIDUS (/)»
			ctx.tokenTail = 2
			break
		} else if (ctx.charAt0 === TOKEN.EOF) {
			ctx.tokenFlag |= FLAGS_ALL.IS_PARSE_ERROR
			ctx.tokenShut = ctx.sourceSize
		} else continue
	}
}
