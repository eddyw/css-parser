import { TOKEN, GRAMMAR_SYMB, GRAMMAR_TYPE } from '~/constants'
import { isWhitespace } from '~/syntax/definitions'
import { getIdentifier, getSpaces, getTypeRange, getMultiplierOrToken } from '.'
import type { GrammarTokenizerContext } from '~/shared/types'

export function getType(x: GrammarTokenizerContext) {
	const open: number = x.shut

	let span: any = null // @todo - fix types

	x.consumeCodeAt0(TOKEN.LESS_THAN)

	const name = getIdentifier(x)

	if (isWhitespace(x.codeAt0)) {
		getSpaces(x)
		span = getTypeRange(x)
	}

	x.consumeCodeAt0(TOKEN.GREATER_THAN)

	return getMultiplierOrToken(x, {
		type: GRAMMAR_TYPE.TYPE,
		symb: GRAMMAR_SYMB.TYPE,
		node: name,
		span,
		spot: {
			offsetIni: open,
			offsetEnd: x.shut,
		},
	})
}
