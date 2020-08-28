import { FLAG_NUMBER, SYNTAX_TYPE, SYNTAX_SYMB } from '~/constants'
import { arrInt, arrDbl } from './include'
import { getTokens } from './functions'
import type { CSSNumber, CSSPercentage, CSSDimension } from '~/shared/types'

describe('Algorithms: Consume number', () => {
	it('should consume Int <number-token>', () => {
		const string = arrInt.join('\t')
		const tokens = getTokens(string)
		const digits = tokens.filter(t => t.type === SYNTAX_TYPE.NUMBER_TOKEN)

		expect(digits).toHaveLength(arrInt.length)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		const bitInt = 0 | FLAG_NUMBER.INTEGER

		digits.forEach((token, i) => {
			expect(token).toMatchObject<Partial<CSSNumber>>({
				type: SYNTAX_TYPE.NUMBER_TOKEN,
				symb: SYNTAX_SYMB.NUMBER_TOKEN,
				node: arrInt[i],
			})
			expect(token.flag).toStrictEqual(bitInt)
		})
	})
	it('should consume Int <percentage-token>', () => {
		const string = arrInt.map(i => `${i}%`).join('\t')
		const tokens = getTokens(string)
		const digits = tokens.filter(t => t.type === SYNTAX_TYPE.PERCENTAGE_TOKEN)

		expect(digits).toHaveLength(arrInt.length)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		const bitInt = 0 | FLAG_NUMBER.INTEGER

		digits.forEach((token, i) => {
			expect(token).toMatchObject<Partial<CSSPercentage>>({
				type: SYNTAX_TYPE.PERCENTAGE_TOKEN,
				symb: SYNTAX_SYMB.PERCENTAGE_TOKEN,
				node: arrInt[i],
			})
			expect(token.flag).toStrictEqual(bitInt)
		})
	})
	it('should consume Int <dimension-token>', () => {
		const string = arrInt.map(i => `${i}em`).join('\t')
		const tokens = getTokens(string)
		const digits = tokens.filter(t => t.type === SYNTAX_TYPE.DIMENSION_TOKEN)

		expect(digits).toHaveLength(arrInt.length)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		const maskInt = 0 | FLAG_NUMBER.INTEGER

		digits.forEach((token, i) => {
			expect(token).toMatchObject<Partial<CSSDimension>>({
				type: SYNTAX_TYPE.DIMENSION_TOKEN,
				symb: SYNTAX_SYMB.DIMENSION_TOKEN,
				node: arrInt[i],
			})
			expect(token.flag).toStrictEqual(maskInt)
		})
	})
	it('should consume Double <number-token>', () => {
		const values = arrDbl.join('\t')
		const tokens = getTokens(values)
		const digits = tokens.filter(t => t.type === SYNTAX_TYPE.NUMBER_TOKEN)

		expect(digits).toHaveLength(arrDbl.length)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		const bitDbl = 0 | FLAG_NUMBER.DOUBLE

		digits.forEach((token, i) => {
			expect(token).toMatchObject<Partial<CSSNumber>>({
				type: SYNTAX_TYPE.NUMBER_TOKEN,
				symb: SYNTAX_SYMB.NUMBER_TOKEN,
				node: arrDbl[i],
			})
			expect(token.flag).toStrictEqual(bitDbl)
		})
	})
	it('should consume Double <percentage-token>', () => {
		const values = arrDbl.map(i => `${i}%`).join('\t')
		const tokens = getTokens(values)
		const digits = tokens.filter(t => t.type === SYNTAX_TYPE.PERCENTAGE_TOKEN)

		expect(digits).toHaveLength(arrDbl.length)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		const maskDbl = 0 | FLAG_NUMBER.DOUBLE

		digits.forEach((token, i) => {
			expect(token).toMatchObject<Partial<CSSPercentage>>({
				type: SYNTAX_TYPE.PERCENTAGE_TOKEN,
				symb: SYNTAX_SYMB.PERCENTAGE_TOKEN,
				node: arrDbl[i],
			})
			expect(token.flag).toStrictEqual(maskDbl)
		})
	})
	it('should consume Double <dimension-token>', () => {
		const values = arrDbl.map(i => `${i}em`).join('\t')
		const tokens = getTokens(values)
		const digits = tokens.filter(t => t.type === SYNTAX_TYPE.DIMENSION_TOKEN)

		expect(digits).toHaveLength(arrDbl.length)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		const maskDbl = 0 | FLAG_NUMBER.DOUBLE

		digits.forEach((token, i) => {
			expect(token).toMatchObject<Partial<CSSDimension>>({
				type: SYNTAX_TYPE.DIMENSION_TOKEN,
				symb: SYNTAX_SYMB.DIMENSION_TOKEN,
				node: arrDbl[i],
			})
			expect(token.flag).toStrictEqual(maskDbl)
		})
	})
})
