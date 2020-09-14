import { isIdentifierCodePoint } from '~/syntax/definitions'
import type { GrammarTokenizerContext } from '~/shared/types'
import type { GrammarNodeIdentifierName } from '~/grammar/shared'

const up = Error('Expected Identifier')

export function getIdentifierName(x: GrammarTokenizerContext): GrammarNodeIdentifierName {
	let open = x.shut

	while (true) {
		if (isIdentifierCodePoint(x.codeAt0)) x.consume(1)
		else break // @todo - handle escape chars
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
