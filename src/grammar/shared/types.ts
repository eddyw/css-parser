import type { SyntaxKind, SyntaxCombinatorKind } from '.'

export interface ParserOptions {
	text?: string
	offsetCol?: number
	offsetLne?: number
}

export interface ParserScanner {
	text: string
	size: number
	at0: number
	at1: number
	at2: number
	open: number
	shut: number
	offsetLne: number
	offsetCol: number
	scan(): void
	consumeAt0(code: number): void
	consume(nth: number): void
	consumeLne(): void
	getPositionOpen(): TextPositionStart
	getPositionShut(spotIni: TextPositionStart): TextPosition
}

/**
 * Node Position
 */
export interface TextPosition {
	offIni?: number
	offEnd?: number
	lneIni?: number
	lneEnd?: number
	colIni?: number
	colEnd?: number
}
export interface TextPositionStart {
	offIni: number
	colIni: number
	lneIni: number
}

/**
 * Nodes
 */
export declare namespace SyntaxNode {
	export type AnyComponentValue =
		| Keyword
		| AtKeyword
		| Comma
		| Delimiter
		| Token
		| PropertyType
		| PropertyTypeRef
		| Group
		| Function
		| Multiplier
	export type AnyCombinator = CombinatorJuxtapose | CombinatorAmpersand | CombinatorBarDouble | CombinatorBarSingle
	export type Any = AnyComponentValue | AnyCombinator | Space

	export interface Keyword {
		kind: SyntaxKind.Keyword
		text: string
		spot: TextPosition
	}
	export interface AtKeyword {
		kind: SyntaxKind.AtKeyword
		text: string
		spot: TextPosition
	}
	export interface Comma {
		kind: SyntaxKind.Comma
		spot: TextPosition
	}
	export interface Space {
		kind: SyntaxKind.Space
		text: string
		spot: TextPosition
	}
	export interface Delimiter {
		/**
		 * This was String
		 * - Add `kind` or `flag`, or `type`
		 */
		kind: SyntaxKind.Delimiter
		node: string
		spot: TextPosition
	}
	export interface Token {
		/**
		 * This should be unquoted delimiter
		 */
		kind: SyntaxKind.Token
		node: string
		spot: TextPosition
	}
	export interface PropertyType {
		kind: SyntaxKind.Type
		name: string
		vmin: number | null
		vmax: number | null
		spot: TextPosition
	}
	export interface PropertyTypeRef {
		kind: SyntaxKind.TypeReference
		name: string
		spot: TextPosition
	}
	export interface Multiplier<T extends AnyComponentValue | null = SyntaxNode.AnyComponentValue> {
		kind: SyntaxKind.Multiplier
		vmin: number
		vmax: number
		hash: boolean
		void: boolean
		node: T
		spot: TextPosition
	}
	export interface MultiplierRequired<Node = any> {
		/**
		 * This should be a Delimiter or Token
		 */
		kind: SyntaxKind.Required
		node: Node
		spot: TextPosition
	}

	export interface Group {
		kind: SyntaxKind.Group
		body: AnyComponentValue[]
		comb: SyntaxCombinatorKind
		root: boolean
		void: boolean
		spot: TextPosition
	}
	export interface Function {
		kind: SyntaxKind.Function
		node: Group
		spot: TextPosition
	}

	export interface CombinatorJuxtapose {
		kind: SyntaxKind.Combinator
		flag: SyntaxCombinatorKind.Juxtapose
		spot: TextPosition
	}
	export interface CombinatorAmpersand {
		kind: SyntaxKind.Combinator
		flag: SyntaxCombinatorKind.Ampersand
		spot: TextPosition
	}
	export interface CombinatorBarDouble {
		kind: SyntaxKind.Combinator
		flag: SyntaxCombinatorKind.BarDouble
		spot: TextPosition
	}
	export interface CombinatorBarSingle {
		kind: SyntaxKind.Combinator
		flag: SyntaxCombinatorKind.BarSingle
		spot: TextPosition
	}
}

export declare namespace SyntaxPartial {
	export interface Keyword {
		text: string
		spot: TextPosition
	}
	/**
	 * Remove me! ⤵
	 */
	export interface Space {
		text: string
		spot: TextPosition
	}
	export interface MultiplierRange {
		vmin: number
		vmax: number
		spot: TextPosition
	}
	export interface Numeric {
		text: string
		repr: number
		spot: TextPosition
	}
	export interface PropertyTypeRange {
		vmin: number | null
		vmax: number | null
		spot: TextPosition
	}
	export interface Multiplier {
		vmin: number
		vmax: number
		hash: boolean
		void: boolean
		spot: TextPosition
	}
}

// /**
//  * Group LinkedList
//  */
export interface LinkedListNode<T extends SyntaxNode.Any = SyntaxNode.Any> {
	nodule: T
	return: LinkedListNode | null
	cousin: LinkedListNode | null
	ignore: boolean
}
export interface LinkedListHead {
	head: LinkedListNode | null
}
