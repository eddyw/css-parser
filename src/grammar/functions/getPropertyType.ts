import { TOKEN } from '~/constants'
import { isWhitespace } from '~/syntax/definitions'
import { getKeyword, getSpace, getPropertyTypeRange, getMultiplierOrNode } from '.'
import { ParserScanner, SyntaxKind, SyntaxNode, SyntaxPartial } from '../shared'

export function getPropertyType(x: ParserScanner): SyntaxNode.PropertyType | SyntaxNode.Multiplier<SyntaxNode.PropertyType> {
	const open = x.getPositionOpen()

	let span: SyntaxPartial.PropertyTypeRange | null = null

	x.consumeAt0(TOKEN.LESS_THAN)

	const name = getKeyword(x)

	if (isWhitespace(x.at0)) {
		getSpace(x)
		span = getPropertyTypeRange(x)
	}

	x.consumeAt0(TOKEN.GREATER_THAN)

	return getMultiplierOrNode<SyntaxNode.PropertyType>(x, {
		kind: SyntaxKind.Type,
		name: name.text,
		vmin: span ? span.vmin : null,
		vmax: span ? span.vmax : null,
		spot: x.getPositionShut(open),
	})
}
