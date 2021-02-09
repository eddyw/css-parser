import { DefinitionSyntax, Node, Kind } from '~/DefinitionSyntax/shared'

export function getToken(this: DefinitionSyntax): Node.Token {
	const open = this.shut

	this.consume(1)

	return {
		kind: Kind.Token,
		name: this.text.charAt(open),
	}
}
