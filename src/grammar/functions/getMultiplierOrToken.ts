import { getMultiplier } from '.'
import type { GrammarTokenizerContext } from '~/shared/types'

export function getMultiplierOrToken(x: GrammarTokenizerContext, token: any) {
	const multiplier = getMultiplier(x)

	if (multiplier) {
		// @ts-ignore - fix me!!!
		multiplier.node = token
		return multiplier
	}

	return token
}
