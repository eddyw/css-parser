import type { GrammarGroupLinkedList, GrammarNodesAndCombinators } from '~/grammar/shared'

type NullOrLinkedList<T extends (GrammarNodesAndCombinators | null)> = T extends GrammarNodesAndCombinators
	? GrammarGroupLinkedList<T>
	: null

export function getLinkedItem<T extends GrammarNodesAndCombinators | null>(
	node: T,
): NullOrLinkedList<T> {
	if (node == null) return null as any

	return {
		nodule: node,
		return: null,
		cousin: null,
		ignore: false,
	} as any
}
