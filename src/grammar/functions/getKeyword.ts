import { isIdentifierCodePoint } from '~/syntax/definitions'
import { ParserScanner, SyntaxPartial } from '../shared'

const up = Error('Expected Identifier')

export function getKeyword(x: ParserScanner): SyntaxPartial.Keyword {
	const spot = x.getPositionOpen()

	while (true) {
		if (isIdentifierCodePoint(x.at0)) x.consume(1)
		else break // @todo - handle escape chars
	}

	if (spot.offIni === x.shut) throw up

	return {
		text: x.text.slice(spot.offIni, x.shut),
		spot: x.getPositionShut(spot),
	}
}
