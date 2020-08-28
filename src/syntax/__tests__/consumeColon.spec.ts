import { SYNTAX_TYPE, SYNTAX_SYMB } from '~/constants'
import { getTokens } from './functions'
import type { CSSColon } from '~/shared/types'

describe('Algorithms: consume <colon-token>', () => {
	it('should consume a <colon-token>', () => {
		const styles = `border:1px; color : red; translate: transform()`
		const tokens = getTokens(styles)
		const colons = tokens.filter(t => t.type === SYNTAX_TYPE.COLON_TOKEN)

		expect(colons).toHaveLength(3)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		expect(colons[0]).toMatchObject<Partial<CSSColon>>({
			type: SYNTAX_TYPE.COLON_TOKEN,
			symb: SYNTAX_SYMB.COLON_TOKEN,
			flag: 0,
			node: ':',
		})
	})
})
