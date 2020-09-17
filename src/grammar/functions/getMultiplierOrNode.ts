import { getMultiplier } from '.'
import { SyntaxKind, ParserScanner, SyntaxNode } from '../shared'

const up = `Multiplier "!" can only be assigned to groups`
const bug = `A multiplier cannot have another multiplier as node`

export function getMultiplierOrNode<T extends SyntaxNode.AnyComponentValue>(
	x: ParserScanner,
	node: T,
): T | SyntaxNode.Multiplier<T> {
	const mult = getMultiplier(x)

	if (mult) {
		// if (multiplier.type === SyntaxKind.Required) {
		// 	if (node.type !== SyntaxKind.Group) throw up

		// 	node.void = false

		// 	return node as T
		// }
		// if (node.type !== SyntaxKind.Multiplier) {
		// 	multiplier.node = node
		// }
		// return multiplier
		if (mult.void === false && node.kind !== SyntaxKind.Group) throw up
		if (node.kind === SyntaxKind.Multiplier) throw bug

		const next = (mult as unknown) as SyntaxNode.Multiplier<T>
		next.node = node

		return next
	}

	return node
}
