import { TOKEN, GRAMMAR_SYMB } from '~/constants'
import { getIdentifierName } from '.'
import type { GrammarTokenizerContext } from '../shared'
import type { GrammarNodeTypeReference } from '~/grammar/shared'

export function getTypeReference(x: GrammarTokenizerContext): GrammarNodeTypeReference {
	const spot = x.getPositionOpen()

	x.consumeCodeAt0(TOKEN.LESS_THAN)
	x.consumeCodeAt0(TOKEN.SINGLE_QUOTE)

	const name = getIdentifierName(x)

	x.consumeCodeAt0(TOKEN.SINGLE_QUOTE)
	x.consumeCodeAt0(TOKEN.GREATER_THAN)

	return {
		symb: GRAMMAR_SYMB.TYPE_REF,
		node: name.node,
		spot: x.getPositionShut(spot),
	}
}
