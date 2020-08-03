import { tokenizer, createContext } from '~'

export function getTokens(css: string) {
  const stream = tokenizer(createContext(css))
  const tokens = []

  do {
    const token = stream.consumeToken()
    tokens.push(token)
  } while (!stream.isDone())

  return tokens
}
