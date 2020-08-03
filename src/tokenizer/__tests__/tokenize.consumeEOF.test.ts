import { TYPE } from '~/constants'
import { getTokens } from './functions'

describe('Tokenize Algorithm - EOF', () => {
	it('should return one token (EOF) when empty content', () => {
		const inputs = ''
		const tokens = getTokens(inputs)

		expect(tokens.length).toBe(1)
		expect(tokens[0].tokenType).toBe(TYPE.EOF)
	})
	it('should return EOF as last token when not-empty content', () => {
		const inputs = 'ident'
		const tokens = getTokens(inputs)

		expect(tokens.length).toBe(2)
		expect(tokens[tokens.length - 1].tokenType).toBe(TYPE.EOF)
	})
})
