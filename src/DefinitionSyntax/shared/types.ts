import { Kind, KindCombinator } from '.'
export type { DefinitionSyntax } from '~/DefinitionSyntax'

export declare namespace Node {
	type ComponentValue =
		| Keyword
		| AtKeyword
		| String
		| Comma
		| Token
		| Multiplier
		| Group
		| PropertyType
		| PropertyReference
		| Function
		| AtFunction

	interface Keyword {
		kind: Kind.Keyword
		name: string // e.g: initial, inherit, unset
	}
	interface AtKeyword {
		kind: Kind.AtKeyword
		name: string // @import
	}
	interface String {
		kind: Kind.String
		name: string
	}
	interface Comma {
		kind: Kind.Comma
	}
	interface Space {
		kind: Kind.Space
	}
	interface Token {
		kind: Kind.Token
		name: string
	}
	interface Multiplier<T extends Exclude<ComponentValue, Multiplier<any>> | null = any> {
		kind: Kind.Multiplier
		vmin: number
		vmax: number
		hash: boolean
		void: boolean
		node: T
	}
	interface Group {
		kind: Kind.Group
		body: ComponentValue[]
		comb: KindCombinator
		root: boolean
		void: boolean
	}
	interface PropertyType {
		kind: Kind.Type
		name: string
		vmin: number
		vmax: number
	}
	interface PropertyReference {
		kind: Kind.TypeReference
		name: string
	}
	interface Function {
		kind: Kind.Function
		name: string
		node: Group
	}
	interface AtFunction {
		kind: Kind.AtFunction
		name: string
		node: Group
	}

	namespace Combinator {
		type Any = Juxtapose | Ampersand | BarDouble | BarSingle

		interface Juxtapose {
			kind: Kind.Combinator
			flag: KindCombinator.Juxtapose
		}
		interface Ampersand {
			kind: Kind.Combinator
			flag: KindCombinator.Ampersand
		}
		interface BarDouble {
			kind: Kind.Combinator
			flag: KindCombinator.BarDouble
		}
		interface BarSingle {
			kind: Kind.Combinator
			flag: KindCombinator.BarSingle
		}
	}
}
