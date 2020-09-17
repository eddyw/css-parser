import { SyntaxKind, SyntaxNode, SyntaxPartial, SyntaxCombinatorKind } from '../shared'

export function getCombinatorJuxtaposeFromSpace(space: SyntaxPartial.Space): SyntaxNode.CombinatorJuxtapose {
	return {
		type: SyntaxKind.Combinator,
		kind: SyntaxCombinatorKind.Juxtapose,
		spot: space.spot,
	}
}
