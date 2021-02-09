import { DefinitionSyntax, Node, Kind } from '~/DefinitionSyntax/shared'

export function getString(this: DefinitionSyntax): Node.String {
	while (this.isWhitespace(this.at0)) this.consume(1)

	return {
		kind: Kind.String,
		name: this.readString()
	}
}
