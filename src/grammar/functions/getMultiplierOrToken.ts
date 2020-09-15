import { GRAMMAR_SYMB } from '~/constants'
import { getMultiplier } from '.'
import type { GrammarTokenizerContext } from '../shared'
import type { GrammarNodes, GrammarNodeGroup, GrammarNodeMultiplier } from '~/grammar/shared'

const up = `Multiplier "!" can only be assigned to groups`

export function getMultiplierOrToken<T extends GrammarNodes>(x: GrammarTokenizerContext, node: T): T | GrammarNodeMultiplier {
	const multiplier = getMultiplier(x)

	if (multiplier) {
		if (multiplier.symb === GRAMMAR_SYMB.REQUIRED) {
			if (node.symb !== GRAMMAR_SYMB.GROUP) throw up
			;(node as GrammarNodeGroup).void = false

			return node
		}
		multiplier.node = node
		return multiplier
	}

	return node
}
