import { TOKEN } from '~/constants'
import { getKeyword, getMultiplierOrNode } from '.'
import { ParserScanner, SyntaxKind, SyntaxNode } from '../shared'

export function getPropertyTypeRef(
	x: ParserScanner,
): SyntaxNode.PropertyTypeRef | SyntaxNode.Multiplier<SyntaxNode.PropertyTypeRef> {
	const spot = x.getPositionOpen()

	x.consumeAt0(TOKEN.LESS_THAN)
	x.consumeAt0(TOKEN.SINGLE_QUOTE)

	const name = getKeyword(x)

	x.consumeAt0(TOKEN.SINGLE_QUOTE)
	x.consumeAt0(TOKEN.GREATER_THAN)

	return getMultiplierOrNode<SyntaxNode.PropertyTypeRef>(x, {
		type: SyntaxKind.TypeReference,
		name: name.text,
		spot: x.getPositionShut(spot),
	})
}
