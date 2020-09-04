import { GRAMMAR_SYMB, GRAMMAR_TYPE } from '~/constants'

export function getJustaposingFromSpace(spaceNode: any) {
  return {
    type: GRAMMAR_TYPE.COMBINATOR,
    symb: GRAMMAR_SYMB.COMBINATOR,
    node: ' ',
    spot: spaceNode.spot,
  }
}
