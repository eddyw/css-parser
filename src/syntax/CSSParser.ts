import { Code } from '~/core'
import {
	BlockTypeOpen,
	BlockTypeShut,
	RuleDeclarationPriority,
	RuleKind,
	RuleListType,
	RuleStyle,
} from './CSSParserTypes'
import { Kind, Token } from './CSSTypes'

export class CSSParser {
	static parseStylesheet(range: CSSTokenStream) {
		// const range = new CSSTokenStream(this.input.getTokens())

		return RuleStyle.Sheet(RuleListType.TopLevelRuleList, this.consumeRuleList(range, RuleListType.TopLevelRuleList))
	}
	static parseRule(range: CSSTokenStream) {
		// const range = new CSSTokenStream(this.input.getTokens())

		this.consumeIncludingWhitespace(range)

		if (range.KindAt1 === Kind.Eof) this.debug(range, Error('parseRule: Syntax error. Unexpected eof'))

		const Rule =
			range.KindAt1 === Kind.AtKeyword
				? this.consumeAtRule(range) //
				: this.consumeQualifiedRule(range) //

		if (!Rule) this.debug(range, Error('parseRule: Parse error. no rule returned'))

		this.consumeIncludingWhitespace(range)

		if (range.KindAt1 === Kind.Eof) return Rule

		this.debug(range, Error('parseRule: Syntax error. expected eof'))
	}
	static parseRuleList(range: CSSTokenStream) {
		// const range = new CSSTokenStream(this.input.getTokens())

		return this.consumeRuleList(range, RuleListType.RegularRuleList)
	}
	static parseDeclaration(range: CSSTokenStream) {
		// const range = new CSSTokenStream(this.input.getTokens())

		this.consumeIncludingWhitespace(range)

		if (range.KindAt1 !== Kind.Ident) throw Error('parseDeclaration: expected ident token')

		const Declaration = this.consumeDeclaration(range)

		if (Declaration) return Declaration

		this.debug(range, Error('parseDeclaration: expected a declaration but nothing was returned'))
	}
	static parseDeclarationList(range: CSSTokenStream) {
		// const range = new CSSTokenStream(this.input.getTokens())

		return this.consumeDeclarationList(range)
	}
	static parseComponentValue(range: CSSTokenStream) {
		// const range = new CSSTokenStream(this.input.getTokens())

		this.consumeIncludingWhitespace(range)

		if (range.KindAt1 === Kind.Eof) this.debug(range, Error('parseComponentValue: unexpected eof'))

		const ComponentValue = this.consumeComponentValue(range)

		this.consumeIncludingWhitespace(range)

		if (range.KindAt1 === Kind.Eof) return ComponentValue

		this.debug(range, Error('parseComponentValue: expected eof'))
	}
	static parseComponentValueList(range: CSSTokenStream) {
		// const range = new CSSTokenStream(this.input.getTokens())
		const componentValueList: any[] = []

		while (true) {
			componentValueList.push(this.consumeComponentValue(range))
			if (range.KindAt1 === Kind.Eof) return componentValueList
		}
	}
	static parseComponentValueListSeparatedByComma(range: CSSTokenStream) {
		// const range = new CSSTokenStream(this.input.getTokens())
		const List: any[] = []

		let CurrentList: any[] = []

		looping: while (true) {
			const ComponentValue = this.consumeComponentValue(range)

			switch (ComponentValue.kind) {
				case Kind.Eof:
					List.push(CurrentList)
					return List
				case Kind.Comma:
					List.push(CurrentList)
					CurrentList = []
					continue looping
			}
		}
	}
	static consumeRuleList(range: CSSTokenStream, flag: RuleListType): any {
		const list: any[] = []

		loop: while (true) {
			range.consume()

			switch (range.KindAt0) {
				case Kind.Whitespace:
					continue loop
				case Kind.Eof:
					return list
				case Kind.AtKeyword:
					range.reconsume()
					list.push(this.consumeAtRule(range))
					continue loop
				case Kind.Cdo:
				case Kind.Cdc:
					if (flag === RuleListType.TopLevelRuleList) continue loop
				default:
					range.reconsume()
					const qualifiedRule = this.consumeQualifiedRule(range)
					if (qualifiedRule) list.push(qualifiedRule)
			}
		}
	}
	static consumeAtRule(range: CSSTokenStream): any {
		range.consume()

		const AtRule = RuleStyle.AtRule(range.NodeAt0.text, []) // body set to nothing??

		loop: while (true) {
			range.consume()

			switch (range.KindAt0) {
				case Kind.SemiColon:
					return AtRule
				case Kind.Eof:
					this.debug(range, Error('consumeAtRule: parse error. Unexpected eof'))
				case Kind.LeftCurlyBracket:
					AtRule.body = this.consumeSimpleBlock(range, Kind.LeftCurlyBracket, Kind.RightCurlyBracket)
					// return AtRule
					break loop
				case RuleKind.SimpleBlock:
					AtRule.body = range.NodeAt1
					// return AtRule
					break loop
				default:
					range.reconsume()
					AtRule.prelude.push(this.consumeComponentValue(range))
			}
		}

		// If @media
		// AtRule.body = this.consumeDeclarationList(new CSSTokenStream(AtRule.body), RuleListType.RegularRuleList)
		return AtRule
	}
	static consumeQualifiedRule(range: CSSTokenStream): any {
		const QualifiedRule = RuleStyle.QualifiedRule()

		looping: while (true) {
			range.consume()

			switch (range.KindAt0) {
				case Kind.Eof:
					throw Error('consumeQualifiedRule: parse error. Unexpected Eof')
				case Kind.LeftCurlyBracket:
					QualifiedRule.body = this.consumeSimpleBlock(range, Kind.LeftCurlyBracket, Kind.RightCurlyBracket)
					// return QualifiedRule
					break looping
				case RuleKind.SimpleBlock:
					if (range.NodeAt0.type === Kind.LeftCurlyBracket) {
						QualifiedRule.body = range.NodeAt1
						// return QualifiedRule
						break looping
					}
				default:
					range.reconsume()
					QualifiedRule.prelude.push(this.consumeComponentValue(range))
			}
		}

		/**
		 * see CSSParserImpl::consumeQualifiedRule
		 * 	- consumeStyleRule (as block)
		 * 		- prelude as selector list
		 * 		- StyleRule::create(consumeDeclarationList(QualifiedRule.body.body))
		 * 			 👆 Create a generic `StyleRule` class @see https://drafts.csswg.org/cssom/#cssstylerule
		 * 					Implement classes from cssom
		 * 	- consumeKeyframeStyleRule (as block)
		 */
		QualifiedRule.body = this.parseDeclarationList(new CSSTokenStream(QualifiedRule.body.body))

		return QualifiedRule
	}
	static consumeDeclarationList(range: CSSTokenStream): any {
		const DeclarationList: any[] = []

		looping: while (true) {
			range.consume()

			switch (range.KindAt0) {
				case Kind.Whitespace:
				case Kind.SemiColon:
					continue looping
				case Kind.Eof:
					return DeclarationList
				case Kind.AtKeyword:
					range.reconsume()
					DeclarationList.push(this.consumeAtRule(range))
					continue looping
				case Kind.Ident:
					const list: any[] = [range.NodeAt0]

					temporary: while (true) {
						switch (range.KindAt1) {
							case Kind.SemiColon:
							case Kind.Eof:
								break temporary
							default:
								list.push(this.consumeComponentValue(range))
						}
					}

					const Declaration = this.consumeDeclaration(new CSSTokenStream(list))
					if (Declaration) DeclarationList.push(Declaration)
					continue looping
				default:
					console.warn('consumeDeclarationList: Parse error')
					range.reconsume()

					throwUpAndRecover: while (true) {
						switch (range.KindAt1) {
							case Kind.SemiColon:
							case Kind.Eof:
								break throwUpAndRecover
							default:
								this.consumeComponentValue(range)
						}
					}

					continue looping
			}
		}
	}
	static consumeDeclaration(range: CSSTokenStream): any {
		range.consume()

		const Declaration = RuleStyle.Declaration(range.NodeAt0.text)

		this.consumeIncludingWhitespace(range)

		if (range.KindAt1 !== Kind.Colon) throw Error('consumeDeclaration: parse error, unexpected token')
		else range.consume()

		this.consumeIncludingWhitespace(range)

		while (range.KindAt1 !== Kind.Eof) {
			Declaration.body.push(this.consumeComponentValue(range))
		}

		looping: for (let i = Declaration.body.length - 1; i >= 0; i -= 1) {
			const Node = Declaration.body[i]
			switch (Node.kind) {
				case Kind.Whitespace:
					continue looping
				case Kind.Ident:
					if (
						Declaration.flag !== RuleDeclarationPriority.Important &&
						Node.text.toLowerCase() === 'important' &&
						Declaration.body[i - 1].kind === Kind.Delim &&
						Declaration.body[i - 1].type === Code.ExclamationMark
					) {
						Declaration.flag = RuleDeclarationPriority.Important
						Declaration.body.splice(i - 1, 2)
						break looping
					}
			}
		}

		if (Declaration.body[Declaration.body.length - 1].kind === Kind.Whitespace) {
			Declaration.body.length -= 1
		}

		return Declaration
	}
	static consumeIncludingWhitespace(range: CSSTokenStream) {
		while (range.KindAt1 === Kind.Whitespace) range.consume()
	}
	static consumeComponentValue(range: CSSTokenStream): any {
		range.consume()

		switch (range.KindAt0) {
			case Kind.LeftCurlyBracket:
				return this.consumeSimpleBlock(range, Kind.LeftCurlyBracket, Kind.RightCurlyBracket)
			case Kind.LeftSquareBracket:
				return this.consumeSimpleBlock(range, Kind.LeftSquareBracket, Kind.RightSquareBracket)
			case Kind.LeftParenthesis:
				return this.consumeSimpleBlock(range, Kind.LeftParenthesis, Kind.RightParenthesis)
			case Kind.Function:
				return this.consumeFunction(range)
			default:
				return range.NodeAt0
		}
	}
	static consumeSimpleBlock(range: CSSTokenStream, KindOpen: BlockTypeOpen, KindShut: BlockTypeShut): any {
		ASSERT(range.KindAt0 === KindOpen)

		const Block = RuleStyle.SimpleBlock(range.KindAt0, [])

		while (true) {
			range.consume()

			switch (range.KindAt0) {
				case KindShut:
					return Block
				case Kind.Eof:
					throw Error('consumeSimpleBlock: parse error. Unexpected Eof')
				default:
					range.reconsume()
					Block.body.push(this.consumeComponentValue(range))
			}
		}
	}
	static consumeFunction(range: CSSTokenStream): any {
		ASSERT(range.KindAt0 === Kind.Function)

		const FunctionRule = RuleStyle.Function(range.NodeAt0.text, [])

		while (true) {
			range.consume()

			switch (range.KindAt1) {
				case Kind.LeftParenthesis:
					return FunctionRule
				case Kind.Eof:
					throw Error('consumeFunction: parse error. Unexpected Eof')
				default:
					range.reconsume()
					FunctionRule.body.push(this.consumeComponentValue(range))
			}
		}
	}
	static debug(range: CSSTokenStream, msg: Error): never {
		console.log('ERROR:', {
			tick: range.tick,
			at0: range.NodeAt0,
			at1: range.NodeAt1,
		})
		throw msg
	}
	static info(range: CSSTokenStream, scope: string) {
		console.log(`INFO: ${scope}`, {
			tick: range.tick,
			at0: range.NodeAt0,
			at1: range.NodeAt1,
		})
	}
}

const IMPLICIT_EOF = Object.freeze(Token.OfKind(Kind.Eof))

function ASSERT(condition: any, msg?: string): asserts condition {
	if (!condition) throw SyntaxError(msg ?? 'Invalid condition')
}

export class CSSTokenStream {
	KindAt0: any
	KindAt1: any
	NodeAt0: any
	NodeAt1: any
	tick: number
	end: number
	input: any[]
	constructor(input: any[], ini: number = 0, end: number = input.length) {
		this.tick = ini - 1
		this.end = end ?? input.length
		this.input = input
		this.consume(0)
	}
	at(n: number): any {
		if (n < this.end && n >= 0) return this.input[n]
		return IMPLICIT_EOF
	}
	consume(n: number = 1) {
		this.tick += n
		this.NodeAt0 = this.at(this.tick)
		this.NodeAt1 = this.at(this.tick + 1)
		this.KindAt0 = this.NodeAt0.kind
		this.KindAt1 = this.NodeAt1.kind
	}
	reconsume() {
		this.tick -= 1
	}
}
