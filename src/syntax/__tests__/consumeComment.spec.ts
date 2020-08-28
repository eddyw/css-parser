import { NODE_SYMB, NODE_TYPE, FLAG_ANY } from '~/constants'
import { getTokens } from './functions'
import { arrComment } from './include'
import type { CSSComment } from '~/shared/types'

describe('Algorithms: consume comments', () => {
	it('should consume valid <comment-token>', () => {
		const styles = arrComment.join('\t')
		const tokens = getTokens(styles) as CSSComment[]
		const comment = tokens.filter(t => t.type === NODE_TYPE.COMMENT_TOKEN)

		expect(comment).toHaveLength(arrComment.length)
		expect(tokens[tokens.length - 1].type).toStrictEqual(NODE_TYPE.END_OF_FILE)

		comment.forEach((token, i) => {
			const node = arrComment[i].slice(2, -2)

			expect(token).toMatchObject<Partial<CSSComment>>({
				type: NODE_TYPE.COMMENT_TOKEN,
				symb: NODE_SYMB.COMMENT_TOKEN,
				flag: 0, // No parse error
				node,
				open: '/*',
				shut: '*/',
			})
		})
	})
	it('should consume <comment-token> with parse error if ends with EOF', () => {
		const styles = ['/* Comment'].join('\t')
		const tokens = getTokens(styles) as CSSComment[]
		const comment = tokens.filter(t => t.type === NODE_TYPE.COMMENT_TOKEN)

		expect(comment).toHaveLength(1)
		expect(tokens[tokens.length - 1].type).toStrictEqual(NODE_TYPE.END_OF_FILE)

		const bitErr = 0 | FLAG_ANY.PARSE_ERROR

		expect(tokens[0]).toMatchObject<Partial<CSSComment>>({
			type: NODE_TYPE.COMMENT_TOKEN,
			symb: NODE_SYMB.COMMENT_TOKEN,
			flag: bitErr,
			node: ' Comment',
			open: '/*',
			shut: '',
		})
	})
})
