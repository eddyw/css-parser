import { getGroupBrackets } from './functions'
import type { ParserScanner } from './shared'

/**
 * Parser entry point
 */
export function parser(x: ParserScanner) {
	x.scan()

	const group = getGroupBrackets(x, true)

	if (x.shut !== x.size) {
		throw Error('parser: BUG! PANIC!')
	}

	return group
}
