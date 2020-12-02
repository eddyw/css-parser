import { TOKEN } from '~/constants'
import { DefinitionSyntax, Node, Kind } from '~/DefinitionSyntax/shared'

interface PropertyTypeRange {
	vmin: number
	vmax: number
}

const SAFE_INFINITY_MIN = Number.MIN_SAFE_INTEGER // Sane default?
const SAFE_INFINITY_MAX = Number.MAX_SAFE_INTEGER // Sane default?

export function getPropertyType(this: DefinitionSyntax): Node.PropertyType | Node.Multiplier<Node.PropertyType> {
	let span: PropertyTypeRange = {
		vmin: SAFE_INFINITY_MIN,
		vmax: SAFE_INFINITY_MAX,
	}

	this.consumeAt0(TOKEN.LESS_THAN)

	const text = this.getKeyword().name

	if (this.isWhitespace(this.at0)) {
		this.consumeSpaces()
		span = this.getPropertyTypeRange()
	}

	this.consumeAt0(TOKEN.GREATER_THAN)

	return this.getMultiplierOrNode<Node.PropertyType>({
		kind: Kind.Type,
		name: text,
		vmin: span.vmin,
		vmax: span.vmax,
	})
}

export function getPropertyTypeRange(this: DefinitionSyntax): PropertyTypeRange {
	let vmin: number = SAFE_INFINITY_MIN // −∞
	let vmax: number = SAFE_INFINITY_MAX // ∞
	let sign: number = 1

	this.consumeAt0(TOKEN.L_SQUARE_BRACKET)

	if (this.at0 === TOKEN.MINUS) {
		this.consume(1)
		sign = -1
	}
	if (this.at0 === TOKEN.INFINITY) {
		this.consume(1)
	} else {
		vmin = sign * Math.min(SAFE_INFINITY_MAX, Number(this.readNumber()))
	}

	this.consumeSpaces()
	this.consumeAt0(TOKEN.COMMA)
	this.consumeSpaces()

	sign = 1

	if (this.at0 === TOKEN.MINUS) {
		this.consume(1)
		sign = -1
	}
	if (this.at0 === TOKEN.INFINITY) {
		this.consume(1)
	} else {
		vmax = sign * Math.min(SAFE_INFINITY_MAX, Number(this.readNumber()))
	}

	this.consumeAt0(TOKEN.R_SQUARE_BRACKET)

	return {
		vmin,
		vmax,
	}
}
