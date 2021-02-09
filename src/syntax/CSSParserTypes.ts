import { Kind } from './CSSTypes'

export const enum RuleKind {
	StyleSheet = 100,
	AtRule,
	SimpleBlock,
	QualifiedRule,
	Declaration,
	DeclarationList,
	Function,
}

export const enum RuleListType {
	RegularRuleList,
	TopLevelRuleList,
	KeyframeRuleList,
}
export const enum RuleDeclarationPriority {
	None,
	Important,
}

export type BlockTypeOpen = Kind.LeftCurlyBracket | Kind.LeftParenthesis | Kind.LeftSquareBracket
export type BlockTypeShut = Kind.RightCurlyBracket | Kind.RightParenthesis | Kind.RightSquareBracket

export namespace RuleStyle {
	export interface Sheet {
		kind: RuleKind.StyleSheet
		flag: RuleListType
		body: any[]
	}
	export function Sheet(flag: RuleListType, body: any[]): Sheet {
		return {
			kind: RuleKind.StyleSheet,
			flag,
			body,
		}
	}

	export interface AtRule {
		kind: RuleKind.AtRule
		name: string
		prelude: any[]
		body: any[]
	}
	export function AtRule(name: string, prelude: any[] = [], body: any[] = []): AtRule {
		return {
			kind: RuleKind.AtRule,
			name,
			body,
			prelude,
		}
	}

	export interface QualifiedRule {
		kind: RuleKind.QualifiedRule
		prelude: any[]
		body: any // Block
	}
	export function QualifiedRule(prelude: any[] = [], body: any[] = []): QualifiedRule {
		return {
			kind: RuleKind.QualifiedRule,
			body,
			prelude,
		}
	}

	export interface DeclarationList {
		kind: RuleKind.DeclarationList
		body: any[]
	}
	export function DeclarationList(body: any[] = []): DeclarationList {
		return {
			kind: RuleKind.DeclarationList,
			body,
		}
	}

	export interface Declaration {
		kind: RuleKind.Declaration
		name: string
		flag: RuleDeclarationPriority
		body: any[]
	}
	export function Declaration(
		name: string,
		body: any[] = [],
		flag: RuleDeclarationPriority = RuleDeclarationPriority.None,
	): Declaration {
		return {
			kind: RuleKind.Declaration,
			name,
			flag,
			body,
		}
	}

	export interface SimpleBlock {
		kind: RuleKind.SimpleBlock
		type: BlockTypeOpen
		body: any[]
	}
	export function SimpleBlock(type: BlockTypeOpen, body: any[] = []): SimpleBlock {
		return {
			kind: RuleKind.SimpleBlock,
			type,
			body,
		}
	}

	export interface Function {
		kind: RuleKind.Function
		name: string
		body: any[]
	}
	export function Function(name: string, body: any[]): Function {
		return {
			kind: RuleKind.Function,
			name,
			body,
		}
	}
}
