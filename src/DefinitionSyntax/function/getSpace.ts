import { DefinitionSyntax, Node, Kind } from '~/DefinitionSyntax/shared'

export function getSpace(this: DefinitionSyntax): Node.Space {
	while (this.isWhitespace(this.at0)) this.consume(1)

	return {
		kind: Kind.Space,
	}
}
