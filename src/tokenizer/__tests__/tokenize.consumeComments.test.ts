import { TYPE, FLAGS_ALL } from '~/constants'
import { getTokens, getTokenValue } from './functions'

describe('Tokenize Algorithm - consumeComments', () => {
	it('should consume single line comments', () => {
		const inputs = [
			'\n' /* 0 */,
			'/* Single line comment #1 */' /* 1 */,
			'\n\t\t' /* 2 */,
			'/* Single line comment #2 */' /* 3 */,
			'\t' /* 4 */,
			'/* Mode comments #3 */' /* 5 */,
		].join('')
		const tokens = getTokens(inputs)
		const comments = tokens.filter(t => t.tokenType === TYPE.COMMENT)

		expect(tokens.length).toBe(7)
		expect(comments.length).toBe(3)
		expect(tokens[1].tokenType).toBe(TYPE.COMMENT)
		expect(tokens[3].tokenType).toBe(TYPE.COMMENT)
		expect(tokens[5].tokenType).toBe(TYPE.COMMENT)
		expect(getTokenValue(inputs, tokens[1])).toBe('/* Single line comment #1 */')
		expect(getTokenValue(inputs, tokens[3])).toBe('/* Single line comment #2 */')
		expect(getTokenValue(inputs, tokens[5])).toBe('/* Mode comments #3 */')
	})
	it('should consume multi line comments', () => {
		const inputs = [
			'\n' /* 0 */,
			'/* Multi line comment #1 \n */' /* 1 */,
			'\n\t\t' /* 2 */,
			'/* Multi line \n comment #2 */' /* 3 */,
			'\t' /* 4 */,
			'/* Mode comments \n\n\n #3 */' /* 5 */,
		].join('')
		const tokens = getTokens(inputs)
		const comments = tokens.filter(t => t.tokenType === TYPE.COMMENT)

		expect(tokens.length).toBe(7)
		expect(comments.length).toBe(3)
		expect(tokens[1].tokenType).toBe(TYPE.COMMENT)
		expect(tokens[3].tokenType).toBe(TYPE.COMMENT)
		expect(tokens[5].tokenType).toBe(TYPE.COMMENT)
		expect(getTokenValue(inputs, tokens[1])).toBe('/* Multi line comment #1 \n */')
		expect(getTokenValue(inputs, tokens[3])).toBe('/* Multi line \n comment #2 */')
		expect(getTokenValue(inputs, tokens[5])).toBe('/* Mode comments \n\n\n #3 */')
	})
	it('should have IS_PARSE_ERROR flag set if comment is unclosed until EOF', () => {
		const inputs = ['/* Single line comment #1 */' /* 0 */, '/* Unclosed comment' /* 1 */].join('')
		const tokens = getTokens(inputs)
		const comments = tokens.filter(t => t.tokenType === TYPE.COMMENT)

		expect(tokens.length).toBe(3)
		expect(comments.length).toBe(2)
		expect(tokens[0].tokenType).toBe(TYPE.COMMENT)
		expect(tokens[1].tokenType).toBe(TYPE.COMMENT)
		expect(tokens[2].tokenType).toBe(TYPE.EOF)
		expect(getTokenValue(inputs, tokens[0])).toBe('/* Single line comment #1 */')
		expect(getTokenValue(inputs, tokens[1])).toBe('/* Unclosed comment')
		expect(!!(tokens[1].tokenFlag & FLAGS_ALL.IS_PARSE_ERROR)).toBe(true)
	})
})
