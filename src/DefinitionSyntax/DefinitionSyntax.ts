import { TOKEN } from '~/constants'
import * as functions from './function'
import * as helpers from './helper'
import { Kind, Node } from './shared'

type ParserPrototype = typeof functions & typeof helpers

export interface ParserOptions {
	text?: string
}
export interface DefinitionSyntax extends ParserPrototype {
	text: string
	size: number
	at0: number
	at1: number
	at2: number
	shut: number
}
export class DefinitionSyntax {
	static parse(options: ParserOptions): Node.Group {
		const instance = new DefinitionSyntax(options)
		const group = instance.getGroup(true)

		if (group.body.length === 1 && group.body[0].kind === Kind.Group) {
			return group.body[0]
		}

		return group
	}

	constructor(options: ParserOptions) {
		this.text = options.text ?? ''
		this.size = this.text.length
		this.at0 = this.size >= 1 ? this.text.charCodeAt(0) : -1
		this.at1 = this.size >= 2 ? this.text.charCodeAt(1) : -1
		this.at2 = this.size >= 3 ? this.text.charCodeAt(2) : -1
		this.shut = 0
	}
	scan(): void {
		const posAt0 = this.shut
		const posAt1 = posAt0 + 1
		const posAt2 = posAt0 + 2

		this.at0 = posAt0 >= this.size ? -1 : this.text.charCodeAt(posAt0)
		this.at1 = posAt1 >= this.size ? -1 : this.text.charCodeAt(posAt1)
		this.at2 = posAt2 >= this.size ? -1 : this.text.charCodeAt(posAt2)
	}
	consume(nth: number): void {
		this.shut += nth
		this.scan()
	}
	consumeAt0(code: number) {
		if (this.at0 !== code) throw Error('Unexpected token')
		this.shut += 1
		this.scan()
	}
	readKeyword(): string {
		const open = this.shut
		while (this.isKeywordChar(this.at0)) this.consume(1)
		if (this.shut === open) throw Error('Expected a keyword')
		return this.text.slice(open, this.shut)
	}
	readNumber(): number {
		const open = this.shut

		while (this.isDigit(this.at0)) this.consume(1)

		if (this.shut === open) throw Error('Expected a number')

		return Number(this.text.slice(open, this.shut))
	}
	readString(): string {
		this.consumeAt0(TOKEN.SINGLE_QUOTE)

		const open = this.shut

		while (this.shut < this.size) {
			if (this.at0 === TOKEN.SINGLE_QUOTE) {
				this.consume(1)
				return this.text.slice(open, this.shut - 1)
			}
			this.consume(1)
		}

		throw Error('Unclosed string')
	}
	consumeSpaces(): void {
		while (this.isWhitespace(this.at0)) this.consume(1)
	}
}
Object.assign(DefinitionSyntax.prototype, functions)
Object.assign(DefinitionSyntax.prototype, helpers)
