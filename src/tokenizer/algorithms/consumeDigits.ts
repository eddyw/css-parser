import { isDigit } from '~/tokenizer/definitions'
import type { TokenizerContext } from '~/shared/types'

/**
 * From https://drafts.csswg.org/css-syntax/#consume-number
 */
export function consumeDigits(ctx: TokenizerContext): void {
	for (; ctx.tokenShut < ctx.sourceSize; ctx.tokenShut++) {
		ctx.setCodePointAtCurrent()
		if (!isDigit(ctx.charAt0)) break
	}
}
