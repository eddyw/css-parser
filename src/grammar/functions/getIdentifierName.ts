import { isIdentifierCodePoint } from '~/syntax/definitions'
import type { GrammarTokenizerContext } from '../shared'
import type { GrammarNodeIdentifierName } from '~/grammar/shared'

const up = Error('Expected Identifier')

export function getIdentifierName(x: GrammarTokenizerContext): GrammarNodeIdentifierName {
	const spot = x.getPositionOpen()

	while (true) {
		if (isIdentifierCodePoint(x.codeAt0)) x.consume(1)
		else break // @todo - handle escape chars
	}

	if (spot.offIni === x.shut) throw up

	return {
		node: x.code.slice(spot.offIni, x.shut),
		spot: x.getPositionShut(spot),
	}
}
