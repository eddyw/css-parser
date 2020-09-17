import { TOKEN } from '~/constants'
import { ParserScanner, SyntaxNode, SyntaxKind, SyntaxCombinatorKind } from '../shared'

export function getCombinatorAmpersand(x: ParserScanner): SyntaxNode.CombinatorAmpersand {
	const spot = x.getPositionOpen()

	x.consumeAt0(TOKEN.AMPERSAND)
	x.consumeAt0(TOKEN.AMPERSAND)

	return {
		kind: SyntaxKind.Combinator,
		flag: SyntaxCombinatorKind.Ampersand,
		spot: x.getPositionShut(spot),
	}
}
