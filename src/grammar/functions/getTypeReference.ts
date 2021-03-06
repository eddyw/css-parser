import { TOKEN, GRAMMAR_SYMB, GRAMMAR_TYPE } from '~/constants'
import { getIdentifierName } from '.'
import type { GrammarTokenizerContext } from '~/shared/types'
import type { GrammarNodeTypeReference } from '~/grammar/shared'

export function getTypeReference(x: GrammarTokenizerContext): GrammarNodeTypeReference {
	let open = x.shut

	x.consumeCodeAt0(TOKEN.LESS_THAN)
	x.consumeCodeAt0(TOKEN.SINGLE_QUOTE)

	const name = getIdentifierName(x)

	x.consumeCodeAt0(TOKEN.SINGLE_QUOTE)
	x.consumeCodeAt0(TOKEN.GREATER_THAN)

	return {
		type: GRAMMAR_TYPE.TYPE_REF,
		symb: GRAMMAR_SYMB.TYPE_REF,
		node: name.node,
		spot: {
			offsetIni: open,
			offsetEnd: x.shut,
		},
	}
}
