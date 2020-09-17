import { TOKEN } from '~/constants'
import { ParserScanner, SyntaxKind, SyntaxNode } from '../shared'

const up = Error('Unclosed quoted delimited')

export function getDelimiterQuoted(x: ParserScanner): SyntaxNode.Delimiter {
	const open = x.getPositionOpen()

	x.consumeAt0(TOKEN.SINGLE_QUOTE)

	while (x.shut < x.size) {
		if (x.at0 === TOKEN.SINGLE_QUOTE) {
			x.consume(1)

			return {
				kind: SyntaxKind.Delimiter,
				node: x.text.slice(open.offIni + 1, x.shut - 1),
				spot: x.getPositionShut(open),
			}
		}
		x.consume(1)
	}

	throw up
}
