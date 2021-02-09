import { TOKEN } from '~/constants'
import { DefinitionSyntax, Node, Kind } from '~/DefinitionSyntax/shared'

export function getKeyword(this: DefinitionSyntax): Node.Keyword {
	return {
		kind: Kind.Keyword,
		name: this.readKeyword(),
	}
}

export function getAtKeyword(this: DefinitionSyntax): Node.AtKeyword {
	this.consumeAt0(TOKEN.AT)

	return {
		kind: Kind.AtKeyword,
		name: this.readKeyword(),
	}
}

export function getKeywordOrFunction(
	this: DefinitionSyntax,
): Node.Keyword | Node.Multiplier<Node.Keyword> | Node.Function {
	const keyword = this.getKeyword()

	if (this.at0 === TOKEN.L_PARENTHESIS) {
		this.consume(1)
		return {
			kind: Kind.Function,
			name: keyword.name,
			node: this.getGroupContents(TOKEN.R_PARENTHESIS),
		}
	}

	return this.getMultiplierOrNode<Node.Keyword>(keyword)
}

export function getAtKeywordOrAtFunction(
	this: DefinitionSyntax,
): Node.AtKeyword | Node.Multiplier<Node.AtKeyword> | Node.AtFunction {
	const keyword = this.getAtKeyword()

	if (this.at0 === TOKEN.L_PARENTHESIS) {
		this.consume(1)
		return {
			kind: Kind.AtFunction,
			name: keyword.name,
			node: this.getGroupContents(TOKEN.R_PARENTHESIS),
		}
	}

	return this.getMultiplierOrNode<Node.AtKeyword>(keyword)
}
