import { getGroup } from './functions'
import type { GrammarTokenizerContext } from '~/shared/types'

export function parser(x: GrammarTokenizerContext) {
	x.setCodeAtCurrent()
	return getGroup(x, false)
}
