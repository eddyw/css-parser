import { isNewline, isTabOrSpace } from '~/tokenizer/definitions'
import type { TokenizerContext } from '~/shared/context'

/**
 * Consume as much whitespace as possible
 */
export function consumeWhitespace(ctx: TokenizerContext): void {
	for (; ctx.tokenShut < ctx.sourceSize; ctx.tokenShut++) {
		ctx.setCodePointAtCurrent()
		if (isNewline(ctx.charAt0)) {
			ctx.setLineAtCurrent()
		} else if (isTabOrSpace(ctx.charAt0)) {
			ctx.tokenColumnShut += 1
		} else break
	}
}
