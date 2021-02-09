import { LinkedNode, RawNode } from './groupByCombinator'

type NullOrLinkedList<T extends RawNode | null> = T extends RawNode ? LinkedNode<T> : null

export function getLinkedItem<T extends RawNode | null>(node: T): NullOrLinkedList<T> {
	if (node == null) return null as any

	return {
		nodule: node,
		return: null,
		cousin: null,
		ignore: false,
	} as any
}
