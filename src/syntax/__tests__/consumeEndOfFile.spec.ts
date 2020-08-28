import { SYNTAX_TYPE } from '~/constants'
import { getTokens } from './functions'

describe('Tokenize Algorithm - EOF', () => {
	it('should return one token (EOF) when empty content', () => {
		const inputs = ''
		const tokens = getTokens(inputs)

		expect(tokens.length).toBe(1)
		expect(tokens[0].type).toBe(SYNTAX_TYPE.END_OF_FILE)
	})
	it('should return EOF as last token when not-empty content', () => {
		const inputs = 'ident'
		const tokens = getTokens(inputs)

		expect(tokens.length).toBe(2)
		expect(tokens[tokens.length - 1].type).toBe(SYNTAX_TYPE.END_OF_FILE)
	})
})
