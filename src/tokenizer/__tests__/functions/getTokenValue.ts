import type { TokenizerReturnToken } from '~/shared/types'

export function getTokenValue(css: string, token: TokenizerReturnToken) {
	return css.slice(token.tokenOpen, token.tokenShut)
}
