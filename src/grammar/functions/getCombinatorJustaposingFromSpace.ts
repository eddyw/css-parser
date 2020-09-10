import { GRAMMAR_SYMB, GRAMMAR_TYPE, GRAMMAR_COMBINATOR } from '~/constants'

export function getCombinatorJustaposingFromSpace(spaceNode: any) {
  return {
    type: GRAMMAR_TYPE.COMBINATOR,
    symb: GRAMMAR_SYMB.COMBINATOR,
    flag: GRAMMAR_COMBINATOR.JUXTAPOSING,
    node: ' ',
    spot: spaceNode.spot,
  }
}
