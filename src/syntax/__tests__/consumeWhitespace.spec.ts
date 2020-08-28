import { SYNTAX_TYPE, SYNTAX_SYMB } from '~/constants'
import { getTokens } from './functions'
import { arrWhitespace } from './include'
import type { CSSWhitespace } from '~/shared/types'

describe('Algorithms: consume whitespace', () => {
	it('should consume <whitespace-token>', () => {
		const styles = arrWhitespace.join('.')
		const tokens = getTokens(styles)
		const spaces = tokens.filter(t => t.type === SYNTAX_TYPE.WHITESPACE_TOKEN)

		expect(spaces).toHaveLength(arrWhitespace.length)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		spaces.forEach((token, i) => {
			expect(token).toMatchObject<Partial<CSSWhitespace>>({
				type: SYNTAX_TYPE.WHITESPACE_TOKEN,
				symb: SYNTAX_SYMB.WHITESPACE_TOKEN,
				flag: 0, // No parse error
				node: arrWhitespace[i],
			})
		})
	})
})
