import { TOKEN } from '~/constants'
import { DefinitionSyntax, Node, Kind, KindCombinator } from '~/DefinitionSyntax/shared'

export function getCombinatorAmpersand(this: DefinitionSyntax): Node.Combinator.Ampersand {
	this.consumeAt0(TOKEN.AMPERSAND)
	this.consumeAt0(TOKEN.AMPERSAND)

	return {
		kind: Kind.Combinator,
		flag: KindCombinator.Ampersand,
	}
}

export function getCombinatorBarSglDbl(this: DefinitionSyntax): Node.Combinator.BarSingle | Node.Combinator.BarDouble {
	this.consumeAt0(TOKEN.VERTICAL_LINE)

	if (this.at0 === TOKEN.VERTICAL_LINE) {
		this.consume(1)
		return {
			kind: Kind.Combinator,
			flag: KindCombinator.BarDouble,
		}
	}

	return {
		kind: Kind.Combinator,
		flag: KindCombinator.BarSingle,
	}
}

export function getCombinatorJuxtapose(this: DefinitionSyntax): Node.Combinator.Juxtapose {
	return {
		kind: Kind.Combinator,
		flag: KindCombinator.Juxtapose,
	}
}
