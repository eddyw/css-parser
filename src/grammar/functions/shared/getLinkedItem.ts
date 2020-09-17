import { SyntaxNode, LinkedListNode } from '../../shared'

type NullOrLinkedList<T extends (SyntaxNode.Any | null)> = T extends SyntaxNode.Any
	? LinkedListNode<T>
	: null

export function getLinkedItem<T extends SyntaxNode.Any | null>(
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
