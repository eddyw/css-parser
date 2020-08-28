import { isDigit } from '~/syntax/definitions'
import type { SyntaxTokenizerContext } from '~/shared/types'

/**
 * From https://drafts.csswg.org/css-syntax/#consume-number
 */
export function consumeDigits(x: SyntaxTokenizerContext): void {
	x.setCodeAtCurrent()
	while (isDigit(x.codeAt0)) {
		x.shut += 1
		x.setCodeAtCurrent()
	}
}
