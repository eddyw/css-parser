import { TOKEN } from '~/constants'
import { DefinitionSyntax, Node, Kind } from '~/DefinitionSyntax/shared'

export function getPropertyReference(
	this: DefinitionSyntax,
): Node.PropertyReference | Node.Multiplier<Node.PropertyReference> {
	this.consumeAt0(TOKEN.LESS_THAN)
	this.consumeAt0(TOKEN.SINGLE_QUOTE)

	const name = this.getKeyword().name

	this.consumeAt0(TOKEN.SINGLE_QUOTE)
	this.consumeAt0(TOKEN.GREATER_THAN)

	return this.getMultiplierOrNode<Node.PropertyReference>({
		kind: Kind.TypeReference,
		name,
	})
}
