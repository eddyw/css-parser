import { TOKEN } from '~/constants'
import { DefinitionSyntax, Node, Kind } from '~/DefinitionSyntax/shared'

export function getLiteralComma(this: DefinitionSyntax): Node.Comma {
	this.consumeAt0(TOKEN.COMMA)
	return {
		kind: Kind.Comma,
	}
}
