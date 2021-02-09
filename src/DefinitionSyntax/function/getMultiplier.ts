import { TOKEN } from '~/constants'
import { DefinitionSyntax, Node, Kind } from '~/DefinitionSyntax/shared'

interface MultiplierRange {
	vmin: number
	vmax: number
}

const MORE = 65535 // Sane default? (unsigned small int)

/**
 * Multiplier for type, word, or group
 */
export function getMultiplier(this: DefinitionSyntax): Node.Multiplier<null> | null {
	const range = {
		vmin: -1,
		vmax: -1,
		hash: false,
		void: true,
	}

	switch (this.at0) {
		case TOKEN.ASTERISK: {
			this.consume(1)
			range.vmax = 0 // 0 or
			range.vmin = MORE // more times
			break
		}
		case TOKEN.PLUS: {
			this.consume(1)
			range.vmin = 1 // 1 or
			range.vmax = MORE // more times
			break
		}
		case TOKEN.QUESTION: {
			this.consume(1)
			range.vmin = 0 // 0 or
			range.vmax = 1 // 1 times
			break
		}
		case TOKEN.HASH: {
			this.consume(1)
			range.hash = true // Separated by comma

			if (this.at0 === (TOKEN.L_CURLY_BRACKET as number)) {
				const node = this.getMultiplierRange()
				range.vmin = node.vmin
				range.vmax = node.vmax
			} else {
				range.vmin = 1 // 1 or
				range.vmax = MORE // more times
			}
			break
		}
		case TOKEN.L_CURLY_BRACKET: {
			const node = this.getMultiplierRange()
			range.vmin = node.vmin
			range.vmax = node.vmax
			break
		}
		case TOKEN.EXCLAMATION: {
			this.consume(1)
			range.void = false
			break
		}
		default: {
			return null
		}
	}

	return {
		kind: Kind.Multiplier,
		vmin: range.vmin,
		vmax: range.vmax,
		hash: range.hash,
		void: range.void,
		node: null,
	}
}

export function getMultiplierRange(this: DefinitionSyntax): MultiplierRange {
	this.consumeAt0(TOKEN.L_CURLY_BRACKET)

	let vmin: number = this.readNumber()
	let vmax: number | undefined = undefined

	if (this.at0 === (TOKEN.COMMA as number)) {
		this.consume(1)

		if (this.at0 !== TOKEN.R_CURLY_BRACKET) {
			vmax = this.readNumber()
		}
	} else {
		vmax = vmin
	}

	this.consumeAt0(TOKEN.R_CURLY_BRACKET)

	return {
		vmin,
		vmax: vmax ?? 0,
	}
}

export function getMultiplierOrNode<T extends Exclude<Node.ComponentValue, Node.Multiplier>>(
	this: DefinitionSyntax,
	node: T,
): T | Node.Multiplier<T> {
	const mult = this.getMultiplier()

	if (mult !== null) {
		if (mult.void === false && node.kind !== Kind.Group) throw Error('Multiplier "!" can only be assigned to groups')

		const next = (mult as any) as Node.Multiplier<T>
		next.node = node

		return next
	}

	return node
}
