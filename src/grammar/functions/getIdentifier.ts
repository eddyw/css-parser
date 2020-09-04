import { isIdentifierCodePoint } from '~/syntax/definitions'
import type { GrammarTokenizerContext } from '~/shared/types'

const up = Error('Expected Identifier')

export function getIdentifier(x: GrammarTokenizerContext) {
	let open = x.shut

	while (true) {
		if (isIdentifierCodePoint(x.codeAt0)) x.consume(1)
		else break // @todo - handle escape
	}

	if (open === x.shut) throw up

	return {
		node: x.code.slice(open, x.shut),
		spot: {
			offsetIni: open,
			offsetEnd: x.shut,
		},
	}
}
