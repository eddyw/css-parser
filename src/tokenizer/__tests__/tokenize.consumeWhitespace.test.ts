import { TYPE } from '~/constants'
import { getTokens, getTokenValue } from './functions'

describe('Tokenize Algorithm - consumeWhitespace', () => {
	it('should consume tabs', () => {
		const inputs = ['\t\t' /* 0 */, 'ident' /* 1 */, '\t\t' /* 2 */].join('')
		const tokens = getTokens(inputs)
		const spaces = tokens.filter(t => t.tokenType === TYPE.WHITESPACE)

		expect(tokens.length).toBe(4)
		expect(spaces.length).toBe(2)
		expect(tokens[0].tokenType).toBe(TYPE.WHITESPACE)
		expect(tokens[2].tokenType).toBe(TYPE.WHITESPACE)
		expect(tokens[3].tokenType).toBe(TYPE.EOF)
		expect(getTokenValue(inputs, tokens[0])).toBe('\t\t')
		expect(getTokenValue(inputs, tokens[2])).toBe('\t\t')
	})
	it('should consume spaces', () => {
		const inputs = ['  ' /* 0 */, 'ident' /* 1 */, '  ' /* 2 */].join('')
		const tokens = getTokens(inputs)
		const spaces = tokens.filter(t => t.tokenType === TYPE.WHITESPACE)

		expect(tokens.length).toBe(4)
		expect(spaces.length).toBe(2)
		expect(tokens[0].tokenType).toBe(TYPE.WHITESPACE)
		expect(tokens[2].tokenType).toBe(TYPE.WHITESPACE)
		expect(tokens[3].tokenType).toBe(TYPE.EOF)
		expect(getTokenValue(inputs, tokens[0])).toBe('  ')
		expect(getTokenValue(inputs, tokens[2])).toBe('  ')
	})
	it('should consume newline', () => {
		const inputs = ['\n\n' /* 0 */, 'ident' /* 1 */, '\n\n' /* 2 */].join('')
		const tokens = getTokens(inputs)
		const spaces = tokens.filter(t => t.tokenType === TYPE.WHITESPACE)

		expect(tokens.length).toBe(4)
		expect(spaces.length).toBe(2)
		expect(tokens[0].tokenType).toBe(TYPE.WHITESPACE)
		expect(tokens[2].tokenType).toBe(TYPE.WHITESPACE)
		expect(tokens[3].tokenType).toBe(TYPE.EOF)
		expect(getTokenValue(inputs, tokens[0])).toBe('\n\n')
		expect(getTokenValue(inputs, tokens[2])).toBe('\n\n')
	})
	it('should consume mixed whitespace', () => {
		const inputs = ['\n \n\t \t' /* 0 */, 'ident' /* 1 */, '  \t\n\n' /* 2 */].join('')
		const tokens = getTokens(inputs)
		const spaces = tokens.filter(t => t.tokenType === TYPE.WHITESPACE)

		expect(tokens.length).toBe(4)
		expect(spaces.length).toBe(2)
		expect(tokens[0].tokenType).toBe(TYPE.WHITESPACE)
		expect(tokens[2].tokenType).toBe(TYPE.WHITESPACE)
		expect(tokens[3].tokenType).toBe(TYPE.EOF)
		expect(getTokenValue(inputs, tokens[0])).toBe('\n \n\t \t')
		expect(getTokenValue(inputs, tokens[2])).toBe('  \t\n\n')
	})
})
