import { getMultiplier } from '.'
import type { GrammarTokenizerContext } from '~/shared/types'
import type { GrammarNodes } from '~/grammar/shared'

export function getMultiplierOrToken<T extends GrammarNodes>(x: GrammarTokenizerContext, token: T) {
	const multiplier = getMultiplier(x)

	if (multiplier) {
		multiplier.node = token
		return multiplier
	}

	return token
}
