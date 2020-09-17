import { isDigit } from '~/syntax/definitions'
import { TOKEN } from '~/constants'
import { ParserScanner, SyntaxPartial } from '../shared'

const up = Error('Expected a number')

export function getNumber(x: ParserScanner, signed: boolean): SyntaxPartial.Numeric {
	const spot = x.getPositionOpen()
	let opSign = spot.offIni

	if (signed && (x.at0 === TOKEN.MINUS || x.at0 === TOKEN.PLUS)) {
		x.consume(1)
		opSign += 1
	}

	while (isDigit(x.at0)) x.consume(1)

	if (opSign === x.shut) throw up

	const text = x.text.slice(spot.offIni, x.shut)

	return {
		text: text,
		repr: Number(text),
		spot: x.getPositionShut(spot),
	}
}
