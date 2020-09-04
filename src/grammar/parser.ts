import { getGroupBrackets } from './functions'
import type { GrammarTokenizerContext } from '~/shared/types'

/**
 * Parser entry point
 */
export function parser(x: GrammarTokenizerContext) {
	x.setCodeAtCurrent()

	const group = getGroupBrackets(x, true)

	if (x.shut !== x.size) {
		throw Error('parser: BUG! PANIC!')
	}

	return group
}
