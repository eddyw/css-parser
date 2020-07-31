import { isWhitespace } from '~/tokenizer/definitions'
import type { TokenizerContext } from '~/shared/context'

/**
 * Consume as much whitespace as possible
 */
export function consumeWhitespace(ctx: TokenizerContext): void {
	for (; ctx.tokenShut < ctx.sourceSize; ctx.tokenShut++) {
		ctx.setCodePointAtCurrent()
		if (!isWhitespace(ctx.charAt0)) break
	}
}
