import { SYNTAX_TYPE, SYNTAX_SYMB } from '~/constants'
import { getTokens } from './functions'
import type { CSSComma } from '~/shared/types'

describe('Algorithms: consume <comma-token>', () => {
	it('should consume a <comma-token>', () => {
		const styles = `rgba(0,1 , 2, 0.1); translate(10px , 20px)`
		const tokens = getTokens(styles)
		const commas = tokens.filter(t => t.type === SYNTAX_TYPE.COMMA_TOKEN)

		expect(commas).toHaveLength(4)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		commas.forEach(token => {
			expect(token).toMatchObject<Partial<CSSComma>>({
				type: SYNTAX_TYPE.COMMA_TOKEN,
				symb: SYNTAX_SYMB.COMMA_TOKEN,
				flag: 0,
				node: ',',
			})
		})
	})
})
