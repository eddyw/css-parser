import { TOKEN, GRAMMAR_SYMB } from '~/constants'
import { isWhitespace } from '~/syntax/definitions'
import { getIdentifierName, getSpaces, getTypeRange, getMultiplierOrToken } from '.'
import type { GrammarTokenizerContext } from '~/shared/types'
import type { GrammarNodeType, GrammarNodeTypeRange, GrammarNodeMultiplier } from '~/grammar/shared'

export function getType(x: GrammarTokenizerContext): GrammarNodeType | GrammarNodeMultiplier {
	const open: number = x.shut

	let span: GrammarNodeTypeRange | null = null

	x.consumeCodeAt0(TOKEN.LESS_THAN)

	const name = getIdentifierName(x)

	if (isWhitespace(x.codeAt0)) {
		getSpaces(x)
		span = getTypeRange(x)
	}

	x.consumeCodeAt0(TOKEN.GREATER_THAN)

	return getMultiplierOrToken<GrammarNodeType>(x, {
		symb: GRAMMAR_SYMB.TYPE,
		node: name.node,
		vmin: span ? span.vmin : null,
		vmax: span ? span.vmax : null,
		spot: x.getSpot(open, x.shut),
	})
}
