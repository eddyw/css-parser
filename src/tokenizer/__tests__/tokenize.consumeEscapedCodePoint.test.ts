import { TYPE } from '~/constants'
import { getTokens, getTokenValue } from './functions'

/**
 * @see https://www.w3.org/International/questions/qa-escapes
 */
describe('Tokenize Algorithm - consumeEscapedCodePoint', () => {
	it('should consume an escaped hex digits', () => {
		const inputs = [
			'.', /* 0 */
			'\\E' /* 1 */,
			'.' /* 2 */,
			'\\E9motion' /* 3 */,
			'.' /* 4 */,
			'\\E9 dition' /* 5 */,
			'.' /* 6 */,
			'\\0000E9dition' /* 7 */,
			'.' /* 8 */,
			'\\31 23' /* 9 */,
			'.' /* 10 */,
			'\\13322\\13171\\13001' /* 11 */,
			'.' /* 12 */,
			'\\13322 \\13171 \\13001' /* 13 */,
			'.' /* 14 */,
			'\\013322\\013171\\013001' /* 15 */,
			'.', /* 16 */
			'\\013322 \\013171 \\013001' /* 17 */,
		].join('')
		const tokens = getTokens(inputs)
		const escapedIdentifiers = tokens.filter(t => t.tokenType === TYPE.IDENTIFIER)

		expect(tokens.length).toBe(19)
		expect(escapedIdentifiers.length).toBe(9)
		expect(tokens[1].tokenType).toBe(TYPE.IDENTIFIER)
		expect(tokens[3].tokenType).toBe(TYPE.IDENTIFIER)
		expect(tokens[5].tokenType).toBe(TYPE.IDENTIFIER)
		expect(tokens[7].tokenType).toBe(TYPE.IDENTIFIER)
		expect(tokens[9].tokenType).toBe(TYPE.IDENTIFIER)
		expect(tokens[11].tokenType).toBe(TYPE.IDENTIFIER)
		expect(tokens[13].tokenType).toBe(TYPE.IDENTIFIER)
		expect(tokens[15].tokenType).toBe(TYPE.IDENTIFIER)
		expect(tokens[17].tokenType).toBe(TYPE.IDENTIFIER)
		expect(tokens[18].tokenType).toBe(TYPE.EOF)

		expect(getTokenValue(inputs,tokens[1])).toBe('\\E')
		expect(getTokenValue(inputs,tokens[3])).toBe('\\E9motion')
		expect(getTokenValue(inputs,tokens[5])).toBe('\\E9 dition')
		expect(getTokenValue(inputs,tokens[7])).toBe('\\0000E9dition')
		expect(getTokenValue(inputs,tokens[9])).toBe('\\31 23')
		expect(getTokenValue(inputs,tokens[11])).toBe('\\13322\\13171\\13001')
		expect(getTokenValue(inputs,tokens[13])).toBe('\\13322 \\13171 \\13001')
		expect(getTokenValue(inputs,tokens[15])).toBe('\\013322\\013171\\013001')
		expect(getTokenValue(inputs,tokens[17])).toBe('\\013322 \\013171 \\013001')
	})
})
