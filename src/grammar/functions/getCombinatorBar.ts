import { TOKEN } from '~/constants'
import { ParserScanner, SyntaxNode, SyntaxKind, SyntaxCombinatorKind } from '../shared'

export function getCombinatorBar(x: ParserScanner): SyntaxNode.CombinatorBarSingle | SyntaxNode.CombinatorBarDouble {
	const spot = x.getPositionOpen()

	x.consumeAt0(TOKEN.VERTICAL_LINE)

	if (x.at0 === TOKEN.VERTICAL_LINE) {
		x.consume(1)
		return {
			type: SyntaxKind.Combinator,
			kind: SyntaxCombinatorKind.BarDouble,
			spot: x.getPositionShut(spot),
		}
	}

	return {
		type: SyntaxKind.Combinator,
		kind: SyntaxCombinatorKind.BarSingle,
		spot: x.getPositionShut(spot),
	}
}
