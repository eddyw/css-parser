import { SyntaxKind, SyntaxNode, SyntaxPartial, SyntaxCombinatorKind } from '../shared'

export function getCombinatorJuxtaposeFromSpace(space: SyntaxPartial.Space): SyntaxNode.CombinatorJuxtapose {
	return {
		kind: SyntaxKind.Combinator,
		flag: SyntaxCombinatorKind.Juxtapose,
		spot: space.spot,
	}
}
