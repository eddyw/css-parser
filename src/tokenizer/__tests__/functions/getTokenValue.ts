import type { TokenizerReturnToken } from '~'

export function getTokenValue(css: string, token: TokenizerReturnToken) {
  return css.slice(token.tokenOpen, token.tokenShut)
}
