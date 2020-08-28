import { SYNTAX_TYPE, SYNTAX_SYMB } from '~/constants'
import { getTokens } from './functions'
import type { CSSCDO } from '~/shared/types'

describe('Algorithms: consume <CDO-token>', () => {
	it('should consume a <CDO-token>', () => {
		const styles = `<!--`
		const tokens = getTokens(styles)
		const cdo = tokens.filter(t => t.type === SYNTAX_TYPE.CDO_TOKEN)

		expect(cdo).toHaveLength(1)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		expect(cdo[0]).toMatchObject<Partial<CSSCDO>>({
			type: SYNTAX_TYPE.CDO_TOKEN,
			symb: SYNTAX_SYMB.CDO_TOKEN,
			flag: 0,
			node: '<!--',
		})
	})
})
