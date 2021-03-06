import { isDigit } from '~/syntax/definitions'
import { TOKEN } from '~/constants'
import type { GrammarTokenizerContext } from '~/shared/types'
import type { GrammarNodeNumber } from '~/grammar/shared'

const up = Error('Expected a number')

export function getNumber(x: GrammarTokenizerContext, signed: boolean): GrammarNodeNumber {
	const open = x.shut
	let opSign = open

	if (signed && (x.codeAt0 === TOKEN.MINUS || x.codeAt0 === TOKEN.PLUS)) {
		x.consume(1)
		opSign += 1
	}

	while (isDigit(x.codeAt0)) x.consume(1)

	if (opSign === x.shut) throw up

	const node = x.code.slice(open, x.shut)

	return {
		node: node,
		repr: Number(node),
		spot: {
			offsetIni: open,
			offsetEnd: x.shut,
		},
	}
}
