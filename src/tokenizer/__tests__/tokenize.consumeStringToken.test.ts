import { TYPE, FLAGS_ALL } from '~/constants'
import { getTokens, getTokenValue } from './functions'

describe('Tokenize Algorithm - consumeStringToken', () => {
	it('should consume a <string-token>', () => {
		const inputs = [
			'\n' /* 0 */,
			'"double quote string"' /* 1 */,
			'\n\t\t' /* 2 */,
			'""' /* 3 */,
			'\t' /* 4 */,
			`'single quote string'` /* 5 */,
		].join('')
		const tokens = getTokens(inputs)
		const strings = tokens.filter(t => t.tokenType === TYPE.STRING)

		expect(tokens.length).toBe(7)
		expect(strings.length).toBe(3)
		expect(tokens[1].tokenType).toBe(TYPE.STRING)
		expect(tokens[3].tokenType).toBe(TYPE.STRING)
		expect(tokens[5].tokenType).toBe(TYPE.STRING)
		expect(tokens[6].tokenType).toBe(TYPE.EOF)
		expect(getTokenValue(inputs, tokens[1])).toBe('"double quote string"')
		expect(getTokenValue(inputs, tokens[3])).toBe('""')
		expect(getTokenValue(inputs, tokens[5])).toBe(`'single quote string'`)
	})
	it('should have IS_PARSE_ERROR flag set if <string-token> ends with unescaped EOF', () => {
		const inputs = [`"unclosed string` /* 0 */].join('')
		const tokens = getTokens(inputs)
		const strings = tokens.filter(t => t.tokenType === TYPE.STRING)

		expect(tokens.length).toBe(2)
		expect(strings.length).toBe(1)
		expect(tokens[0].tokenType).toBe(TYPE.STRING)
		expect(tokens[1].tokenType).toBe(TYPE.EOF)
		expect(getTokenValue(inputs, tokens[0])).toBe('"unclosed string')
		expect(!!(tokens[0].tokenFlag & FLAGS_ALL.IS_PARSE_ERROR)).toBe(true)
	})
	it('should consume a <bad-string-token> if ends with unescaped newline', () => {
		const inputs = [`"unclosed string` /* 0 */, '\n' /* 1 */].join('')
		const tokens = getTokens(inputs)
		const strings = tokens.filter(t => t.tokenType === TYPE.STRING_BAD)

		expect(tokens.length).toBe(3)
		expect(strings.length).toBe(1)
		expect(tokens[0].tokenType).toBe(TYPE.STRING_BAD)
		expect(tokens[1].tokenType).toBe(TYPE.WHITESPACE)
		expect(tokens[2].tokenType).toBe(TYPE.EOF)
		expect(getTokenValue(inputs, tokens[0])).toBe('"unclosed string')
		expect(getTokenValue(inputs, tokens[1])).toBe('\n')
		expect(!!(tokens[0].tokenFlag & FLAGS_ALL.IS_PARSE_ERROR)).toBe(true)
	})
	it('should consume a <string-token> if ends with escaped EOF', () => {
		const inputs = [`"unclosed string\\` /* 0 */].join('')
		const tokens = getTokens(inputs)
		const strings = tokens.filter(t => t.tokenType === TYPE.STRING)

		expect(tokens.length).toBe(2)
		expect(strings.length).toBe(1)
		expect(tokens[0].tokenType).toBe(TYPE.STRING)
		expect(tokens[1].tokenType).toBe(TYPE.EOF)
		expect(getTokenValue(inputs, tokens[0])).toBe('"unclosed string\\')
		expect(!!(tokens[0].tokenFlag & FLAGS_ALL.IS_PARSE_ERROR)).toBe(false)
	})
	it('should consume a multi-line <string-token> if newline is escaped', () => {
		const inputs = [`"unclosed string\\\n"` /* 0 */].join('')
		const tokens = getTokens(inputs)
		const strings = tokens.filter(t => t.tokenType === TYPE.STRING)

		expect(tokens.length).toBe(2)
		expect(strings.length).toBe(1)
		expect(tokens[0].tokenType).toBe(TYPE.STRING)
		expect(tokens[1].tokenType).toBe(TYPE.EOF)
		expect(getTokenValue(inputs, tokens[0])).toBe('"unclosed string\\\n"')
		expect(!!(tokens[0].tokenFlag & FLAGS_ALL.IS_PARSE_ERROR)).toBe(false)
	})
	it('should consume a <string-token> with escaped single/double quotes', () => {
		const inputs = [`"this is a \\" string"` /* 0 */, `'this is a \\' string'` /* 1 */].join('')
		const tokens = getTokens(inputs)
		const strings = tokens.filter(t => t.tokenType === TYPE.STRING)

		expect(tokens.length).toBe(3)
		expect(strings.length).toBe(2)
		expect(tokens[0].tokenType).toBe(TYPE.STRING)
		expect(tokens[2].tokenType).toBe(TYPE.EOF)
		expect(getTokenValue(inputs, tokens[0])).toBe(`"this is a \\" string"`)
		expect(getTokenValue(inputs, tokens[1])).toBe(`'this is a \\' string'`)
	})
})
