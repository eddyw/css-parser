import type { GRAMMAR_SYMB, GRAMMAR_TYPE, GRAMMAR_COMBINATOR } from '~/constants'

/**
 * Node Position
 */
export interface GrammarNodePosition {
	offsetIni?: number
	offsetEnd?: number
	offsetLne?: number
	offsetCol?: number
}

/**
 * Nodes
 */
export interface GrammarNodeIdentifier {
	type: GRAMMAR_TYPE.IDENTIFIER
	symb: GRAMMAR_SYMB.IDENTIFIER
	node: string
	spot: GrammarNodePosition | null
}
export interface GrammarNodeFunction {
	// @todo
	type: GRAMMAR_TYPE.FUNCTION
	symb: GRAMMAR_SYMB.FUNCTION
}
export interface GrammarNodeComma {
	type: GRAMMAR_TYPE.COMMA
	symb: GRAMMAR_SYMB.COMMA
	spot: GrammarNodePosition | null
}
export interface GrammarNodeSpace {
	type: GRAMMAR_TYPE.WHITESPACE
	symb: GRAMMAR_SYMB.WHITESPACE
	node: string
	spot: GrammarNodePosition | null
}
export interface GrammarNodeString {
	type: GRAMMAR_TYPE.STRING
	symb: GRAMMAR_SYMB.STRING
	node: string
	spot: GrammarNodePosition | null
}
export interface GrammarNodeToken {
	type: GRAMMAR_TYPE.TOKEN
	symb: GRAMMAR_SYMB.TOKEN
	node: string
	spot: GrammarNodePosition | null
}
export interface GrammarNodeType {
	type: GRAMMAR_TYPE.TYPE
	symb: GRAMMAR_SYMB.TYPE
	node: string
	vmin: number | null
	vmax: number | null
	spot: GrammarNodePosition | null
}
export interface GrammarNodeTypeReference {
	type: GRAMMAR_TYPE.TYPE_REF
	symb: GRAMMAR_SYMB.TYPE_REF
	node: string
	spot: GrammarNodePosition | null
}

/**
 * Group of nodes (omits combinators)
 */
export interface GrammarNodeGroup {
	type: GRAMMAR_TYPE.GROUP
	symb: GRAMMAR_SYMB.GROUP
	body: GrammarNodes[]
	comb: GRAMMAR_COMBINATOR
	root: boolean
	void: boolean
	spot: GrammarNodePosition | null
}

/**
 * Combinator nodes
 */
export interface GrammarNodeCombinatorJuxtapose {
	type: GRAMMAR_TYPE.COMBINATOR
	symb: GRAMMAR_SYMB.COMBINATOR
	flag: GRAMMAR_COMBINATOR.JUXTAPOSE
	spot: GrammarNodePosition | null
}
export interface GrammarNodeCombinatorAmpersand {
	type: GRAMMAR_TYPE.COMBINATOR
	symb: GRAMMAR_SYMB.COMBINATOR
	flag: GRAMMAR_COMBINATOR.AMPERSAND
	spot: GrammarNodePosition | null
}
export interface GrammarNodeCombinatorVerticalDouble {
	type: GRAMMAR_TYPE.COMBINATOR
	symb: GRAMMAR_SYMB.COMBINATOR
	flag: GRAMMAR_COMBINATOR.VL_DOUBLE
	spot: GrammarNodePosition | null
}
export interface GrammarNodeCombinatorVerticalSingle {
	type: GRAMMAR_TYPE.COMBINATOR
	symb: GRAMMAR_SYMB.COMBINATOR
	flag: GRAMMAR_COMBINATOR.VL_SINGLE
	spot: GrammarNodePosition | null
}

/**
 * Multiplier node
 */
export interface GrammarNodeMultiplier<Node = GrammarNodes | null> {
	type: GRAMMAR_TYPE.MULTIPLIER
	symb: GRAMMAR_SYMB.MULTIPLIER
	vmin: number
	vmax: number
	hash: boolean
	node: Node
	spot: GrammarNodePosition | null
}

/**
 * Sub-nodes (nodes without type)
 */
export interface GrammarNodeMultiplierRange {
	vmin: number
	vmax: number
	spot: GrammarNodePosition | null
}
export interface GrammarNodeNumber {
	node: string
	repr: number
	spot: GrammarNodePosition | null
}
export interface GrammarNodeTypeRange {
	vmin: number | null
	vmax: number | null
	spot: GrammarNodePosition | null
}
export interface GrammarNodeIdentifierName {
	node: string
	spot: GrammarNodePosition | null
}

export type GrammarCombinators =
	| GrammarNodeCombinatorJuxtapose
	| GrammarNodeCombinatorAmpersand
	| GrammarNodeCombinatorVerticalDouble
	| GrammarNodeCombinatorVerticalSingle

export type GrammarNodes =
	| GrammarNodeIdentifier
	| GrammarNodeFunction
	| GrammarNodeComma
	| GrammarNodeSpace
	| GrammarNodeString
	| GrammarNodeToken
	| GrammarNodeType
	| GrammarNodeTypeReference
	| GrammarNodeMultiplier
	| GrammarNodeGroup

export type GrammarNodesAndCombinators = GrammarCombinators | GrammarNodes

/**
 * Group LinkedList
 */
export interface GrammarGroupLinkedList<T extends GrammarNodesAndCombinators = GrammarNodesAndCombinators> {
	nodule: T
	return: GrammarGroupLinkedList | null
	cousin: GrammarGroupLinkedList | null
	ignore: boolean
}
export interface GrammarGroupLinkedListHeadPointer {
	head: GrammarGroupLinkedList | null
}
export interface GrammarGroupContentsCombinators {
	[GRAMMAR_COMBINATOR.JUXTAPOSE]: GrammarGroupLinkedList<GrammarCombinators>[]
	[GRAMMAR_COMBINATOR.AMPERSAND]: GrammarGroupLinkedList<GrammarCombinators>[]
	[GRAMMAR_COMBINATOR.VL_DOUBLE]: GrammarGroupLinkedList<GrammarCombinators>[]
	[GRAMMAR_COMBINATOR.VL_SINGLE]: GrammarGroupLinkedList<GrammarCombinators>[]
}
