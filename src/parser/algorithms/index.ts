import { NODE_SYMB, BLOCK_MIRROR } from '~/constants'
import type { Tokenizer, CSSToken } from '~/shared/types'

export function parseSomethingAccordingToCSSGrammar() {}
export function parseCommaSeparatedListAccordingToCSSGrammar() {}
/**
 * @see https://drafts.csswg.org/css-syntax/#parse-stylesheet
 * @description § 5.3.3. Parse a stylesheet
 * To parse a stylesheet from an input:
 * 1. If input is a byte stream for stylesheet, decode bytes from input, and set input to the result.
 * 2. Normalize input, and set input to the result.
 * 3. Create a new stylesheet.
 * 4. Consume a list of rules from input, with the top-level flag set, and set the stylesheet’s value to the result.
 * 5. Return the stylesheet.
 */
export function parseStylesheet() {}
/**
 * @see https://drafts.csswg.org/css-syntax/#parse-list-of-rules
 * @description § 5.3.4. Parse a list of rules
 * To parse a list of rules from input:
 * Normalize input, and set input to the result.
 * Consume a list of rules from the input, with the top-level flag unset.
 * Return the returned list.
 */
export function parseListOfRules() {}
/**
 * @see https://drafts.csswg.org/css-syntax/#parse-rule
 * @description § 5.3.5. Parse a rule
 * To parse a rule from input:
 * 1. Normalize input, and set input to the result.
 * 2. While the next input token from input is a <whitespace-token>,
 *    consume the next input token from input.
 * 3. If the next input token from input is an <EOF-token>, return a syntax error.
 *    Otherwise, if the next input token from input is an <at-keyword-token>,
 *    consume an at-rule from input, and let rule be the return value.
 *
 *    Otherwise, consume a qualified rule from input and let rule be the return value.
 *    If nothing was returned, return a syntax error.
 *
 * 4. While the next input token from input is a <whitespace-token>,
 *    consume the next input token from input.
 * 5. If the next input token from input is an <EOF-token>, return rule.
 *    Otherwise, return a syntax error.
 */
export function parseRule() {}
/**
 * @see https://drafts.csswg.org/css-syntax/#parse-declaration
 * @description § 5.3.6. Parse a declaration
 * Note: Unlike "Parse a list of declarations", this parses only a declaration and not an at-rule.
 *
 * To parse a declaration from input:
 * 1. Normalize input, and set input to the result.
 * 2. While the next input token from input is a <whitespace-token>, consume the next input token.
 * 3. If the next input token from input is not an <ident-token>, return a syntax error.
 * 4. Consume a declaration from input. If anything was returned, return it.
 *    Otherwise, return a syntax error.
 */
export function parseDeclaration() {}
/**
 * @see https://drafts.csswg.org/css-syntax/#parse-list-of-declarations
 * @description § 5.3.7. Parse a list of declarations
 * Note: Despite the name, this actually parses a mixed list of declarations and at-rules, as CSS 2.1 does for @page.
 * Unexpected at-rules (which could be all of them, in a given context) are invalid and will be ignored by the consumer.
 *
 * To parse a list of declarations from input:
 * 1. Normalize input, and set input to the result.
 * 2. Consume a list of declarations from input, and return the result.
 */
export function parseListOfDeclarations() {}
/**
 * @see https://drafts.csswg.org/css-syntax/#parse-component-value
 * @description § To parse a component value from input:
 * 1. Normalize input, and set input to the result.
 * 2. While the next input token from input is a <whitespace-token>, consume the next input token from input.
 * 3. If the next input token from input is an <EOF-token>, return a syntax error.
 * 4. Consume a component value from input and let value be the return value.
 * 5. While the next input token from input is a <whitespace-token>, consume the next input token.
 * 6. If the next input token from input is an <EOF-token>, return value. Otherwise, return a syntax error.
 */
export function parseComponentValue() {}
/**
 * @see https://drafts.csswg.org/css-syntax/#parse-list-of-component-values
 * @description § 5.3.9. Parse a list of component values
 * To parse a list of component values from input:
 * 1. Normalize input, and set input to the result.
 * 2. Repeatedly consume a component value from input until an <EOF-token> is returned,
 *    appending the returned values (except the final <EOF-token>) into a list. Return the list.
 */
export function parseListOfComponentValue() {}
/**
 * @see https://drafts.csswg.org/css-syntax/#parse-comma-separated-list-of-component-values
 * @description § 5.3.10. Parse a comma-separated list of component values
 * To parse a comma-separated list of component values from input:
 * 1. Normalize input, and set input to the result.
 * 2. Let list of cvls be an initially empty list of component value lists.
 * 3. Repeatedly consume a component value from input until an <EOF-token> or <comma-token> is returned,
 *    appending the returned values (except the final <EOF-token> or <comma-token>) into a list.
 *    Append the list to list of cvls. If it was a <comma-token> that was returned, repeat this step.
 * 4. Return list of cvls.
 */
export function parseListOfComponentValueSeparatedByComma() {}

/**
 * @see https://drafts.csswg.org/css-syntax/#consume-list-of-rules
 * @description § 5.4.1. Consume a list of rules
 * To consume a list of rules:
 *
 * Create an initially empty list of rules.
 * Repeatedly consume the next input token:
 *
 * <whitespace-token>
 *    Do nothing.
 * <EOF-token>
 *    Return the list of rules.
 * <CDO-token>
 * <CDC-token>
 *    If the top-level flag is set, do nothing.
 *    Otherwise, reconsume the current input token. Consume a qualified rule. If anything is returned,
 *    append it to the list of rules.
 * <at-keyword-token>
 *    Reconsume the current input token. Consume an at-rule,
 *    and append the returned value to the list of rules.
 * anything else
 *    Reconsume the current input token. Consume a qualified rule.
 *    If anything is returned, append it to the list of rules.
 */
export function consumeListOfRules(x: Tokenizer, isTopLevel: boolean = false) {
	const listOfRules = {
		type: 'CSSListOfRules',
		flag: 0,
		list: [] as any[],
	}

	let token

	do {
		token = x.consumeToken()

		if (token.symb === NODE_SYMB.WHITESPACE_TOKEN) continue
		if (token.symb === NODE_SYMB.END_OF_FILE) return listOfRules
		if (token.symb === NODE_SYMB.CDO_TOKEN || token.symb === NODE_SYMB.CDC_TOKEN) {
			if (isTopLevel) continue
			listOfRules.list.push(consumeQualifiedRule(x, token))
			continue
		}
		if (token.symb === NODE_SYMB.AT_KEYWORD_TOKEN) {
			listOfRules.list.push(consumeAtRule(x, token))
			continue
		}
		listOfRules.list.push(consumeQualifiedRule(x, token))
	} while (!x.isDone())
}
/**
 * @see https://drafts.csswg.org/css-syntax/#consume-at-rule
 * @description § 5.4.2. Consume an at-rule
 * To consume an at-rule:
 *
 * Consume the next input token.
 * Create a new at-rule with its name set to the value of the current input token,
 * its prelude initially set to an empty list,
 * and its value initially set to nothing.
 *
 * Repeatedly consume the next input token:
 *
 * <semicolon-token>
 *    Return the at-rule.
 * <EOF-token>
 *    This is a parse error. Return the at-rule.
 * <{-token>
 *    Consume a simple block and assign it to the at-rule’s block. Return the at-rule.
 * simple block with an associated token of <{-token>
 *    Assign the block to the at-rule’s block. Return the at-rule.
 * anything else
 *    Reconsume the current input token. Consume a component value.
 *    Append the returned value to the at-rule’s prelude.
 */
export function consumeAtRule(x: Tokenizer, token?: CSSToken): any {
	if (!token) token = x.consumeToken()

	const atRule = {
		type: 'CSSAtRule',
		flag: 0,
		name: token,
		lead: [] as any[],
		node: null as any,
	}

	do {
		token = x.consumeToken()
		if (token.symb === NODE_SYMB.SEMICOLON_TOKEN) return atRule
		if (token.symb === NODE_SYMB.END_OF_FILE) {
			atRule.flag |= 0b1 // Parse error
			atRule.node = token // EOF
			return atRule
		}
		if (token.symb === NODE_SYMB.OPEN_CURLY_BRACE_TOKEN) {
			atRule.node = consumeSimpleBlock(x, token, NODE_SYMB.SHUT_CURLY_BRACE_TOKEN)
			return atRule
		}
		atRule.lead.push(consumeComponentValue(x, token))
	} while (true)
}
/**
 * @see https://drafts.csswg.org/css-syntax/#consume-qualified-rule
 * @description § 5.4.3. Consume a qualified rule
 * To consume a qualified rule:
 *
 * Create a new qualified rule with its prelude initially set to an empty list,
 * and its value initially set to nothing.
 *
 * Repeatedly consume the next input token:
 *
 * <EOF-token>
 *    This is a parse error. Return nothing.
 * <{-token>
 *    Consume a simple block and assign it to the qualified rule’s block. Return the qualified rule.
 * simple block with an associated token of <{-token>
 *    Assign the block to the qualified rule’s block. Return the qualified rule.
 * anything else
 *    Reconsume the current input token. Consume a component value.
 *    Append the returned value to the qualified rule’s prelude.
 */
export function consumeQualifiedRule(x: Tokenizer, token?: CSSToken): any {
	if (!token) token = x.consumeToken()

	const qualifiedRule = {
		type: 'CSSQualifiedRule',
		flag: 0,
		lead: [] as any[],
		node: null as any,
	}

	do {
		if (token.symb === NODE_SYMB.END_OF_FILE) {
			qualifiedRule.flag |= 0b1 // Parse error
			qualifiedRule.node = token
			return qualifiedRule
		}
		if (token.symb === NODE_SYMB.OPEN_CURLY_BRACE_TOKEN) {
			qualifiedRule.node = consumeSimpleBlock(x, token, NODE_SYMB.SHUT_CURLY_BRACE_TOKEN)
			return qualifiedRule
		}
		qualifiedRule.lead.push(consumeComponentValue(x, token))
		token = x.consumeToken()
	} while (x.isDone())
}
/**
 * @see https://drafts.csswg.org/css-syntax/#consume-list-of-declarations
 * @description § 5.4.4. Consume a list of declarations
 * To consume a list of declarations:
 *
 * Create an initially empty list of declarations.
 *
 * Repeatedly consume the next input token:
 *
 * <whitespace-token>
 * <semicolon-token>
 *    Do nothing.
 * <EOF-token>
 *    Return the list of declarations.
 * <at-keyword-token>
 *    Reconsume the current input token. Consume an at-rule.
 *    Append the returned rule to the list of declarations.
 * <ident-token>
 *    Initialize a temporary list initially filled with the current input token.
 *    As long as the next input token is anything other than a <semicolon-token> or <EOF-token>,
 *    consume a component value and append it to the temporary list.
 *    Consume a declaration from the temporary list. If anything was returned,
 *    append it to the list of declarations.
 * anything else
 *    This is a parse error. Reconsume the current input token.
 *    As long as the next input token is anything other than a <semicolon-token> or <EOF-token>,
 *    consume a component value and throw away the returned value.
 */
export function consumeListOfDeclarations(x: Tokenizer): any {
	const listOfDeclarations = {
		type: 'CSSListOfDeclarations',
		flag: 0,
		list: [] as any[],
	}

	do {
		const token = x.consumeToken()

		if (
			token.symb === NODE_SYMB.WHITESPACE_TOKEN ||
			token.symb === NODE_SYMB.COMMENT_TOKEN ||
			token.symb === NODE_SYMB.SEMICOLON_TOKEN
		) {
			continue
		}

		if (token.symb === NODE_SYMB.END_OF_FILE) return listOfDeclarations
		if (token.symb === NODE_SYMB.AT_KEYWORD_TOKEN) {
			listOfDeclarations.list.push(consumeAtRule(x, token))
			continue
		}
		if (token.symb === NODE_SYMB.IDENT_TOKEN) {
			/**
			 * @todo – pass down endToken <semicolon-token> or <EOF-token>
			 */
			listOfDeclarations.list.push(consumeDeclaration(x, token))
			continue
		}
	} while (!x.isDone())
}
/**
 * @see https://drafts.csswg.org/css-syntax/#consume-declaration
 * @description § 5.4.5. Consume a declaration
 * Note: This algorithm assumes that the next input token has already been checked to be an <ident-token>.
 *
 * To consume a declaration:
 *
 * Consume the next input token.
 * Create a new declaration
 *  with its name set to the value of the current input token
 *  and its value initially set to an empty list.
 *
 * 1. While the next input token is a <whitespace-token>, consume the next input token.
 * 2. If the next input token is anything other than a <colon-token>,
 *    this is a parse error. Return nothing.
 *    Otherwise, consume the next input token.
 * 3. While the next input token is a <whitespace-token>, consume the next input token.
 * 4. As long as the next input token is anything other than an <EOF-token>,
 *    consume a component value and append it to the declaration’s value.
 * 5. If the last two non-<whitespace-token>s in the declaration’s value are
 *    a <delim-token> with the value "!" followed by an <ident-token>
 *    with a value that is an ASCII case-insensitive match for "important",
 *    remove them from the declaration’s value and set the declaration’s important flag to true.
 * 6. While the last token in the declaration’s value is a <whitespace-token>, remove that token.
 * 7. Return the declaration.
 */
export function consumeDeclaration(x: Tokenizer, token?: CSSToken): any {
	if (!token) token = x.consumeToken()

	const declaration = {
		type: 'CSSDeclaration',
		name: token,
		flag: 0,
		list: [] as any[],
		spot: {
			offsetIni: token.spot.offsetIni,
			offsetEnd: token.spot.offsetEnd,
		},
	}

	do {
		token = x.consumeToken()
		declaration.spot.offsetEnd = token.spot.offsetEnd
	} while (token.symb === NODE_SYMB.WHITESPACE_TOKEN || token.symb === NODE_SYMB.COMMENT_TOKEN)

	if (token.symb !== NODE_SYMB.COLON_TOKEN) {
		declaration.flag |= 1 << 0 // PARSE ERROR
		return declaration
	}

	do {
		token = x.consumeToken()
		declaration.spot.offsetEnd = token.spot.offsetEnd
	} while (token.symb === NODE_SYMB.WHITESPACE_TOKEN || token.symb === NODE_SYMB.COMMENT_TOKEN)

	while (token.symb !== NODE_SYMB.END_OF_FILE) {
		declaration.list.push(consumeComponentValue(x, token))
		token = x.consumeToken()
	}

	/**
	 * @todo deal with !important
	 */

	return declaration
}
/**
 * @see https://drafts.csswg.org/css-syntax/#consume-component-value
 * @description § 5.4.6. Consume a component value
 * To consume a component value:
 *
 * Consume the next input token.
 *
 * If the current input token is a <{-token>, <[-token>, or <(-token>,
 * consume a simple block and return it.
 *
 * Otherwise, if the current input token is a <function-token>,
 * consume a function and return it.
 *
 * Otherwise, return the current input token.
 */
export function consumeComponentValue(x: Tokenizer, token?: CSSToken): any {
	if (!token) token = x.consumeToken()

	if (
		token.symb === NODE_SYMB.OPEN_CURLY_BRACE_TOKEN ||
		token.symb === NODE_SYMB.OPEN_SQUARE_BRACKET_TOKEN ||
		token.symb === NODE_SYMB.OPEN_PARENTHESIS_TOKEN
	) {
		return consumeSimpleBlock(x, token, BLOCK_MIRROR[token.symb])
	}

	if (token.symb === NODE_SYMB.FUNCTION_TOKEN) {
		return consumeFunction(x, token)
	}
	return token
}
/**
 * @see https://drafts.csswg.org/css-syntax/#consume-simple-block
 * @description § 5.4.7. Consume a simple block
 * Note: This algorithm assumes that the current input token has already been checked to be an <{-token>, <[-token>, or <(-token>.
 *
 * To consume a simple block:
 *
 * The ending token is the mirror variant of the current input token. (E.g. if it was called with <[-token>, the ending token is <]-token>.)
 *
 * Create a simple block with its associated token set to the current input token
 * and with its value initially set to an empty list.
 *
 * Repeatedly consume the next input token and process it as follows:
 *
 * ending token
 *    Return the block.
 * <EOF-token>
 *    This is a parse error. Return the block.
 * anything else
 *    Reconsume the current input token. Consume a component value and append it to the value of the block.
 *
 * Note: CSS has an unfortunate syntactic ambiguity between blocks that can contain declarations
 * and blocks that can contain qualified rules, so any "consume" algorithms that handle rules will initially
 * use this more generic algorithm rather than the more specific consume a list of declarations
 * or consume a list of rules algorithms. These more specific algorithms are instead invoked
 * when grammars are applied, depending on whether it contains a <declaration-list> or a <rule-list>/<stylesheet>.
 */
export function consumeSimpleBlock(x: Tokenizer, token?: CSSToken, endBlockSymb?: NODE_SYMB): any {
	if (!token) token = x.consumeToken()

	const block = {
		type: 'CSSBlock',
		flag: 0,
		open: token,
		shut: null as any,
		list: [] as any[],
	}

	do {
		token = x.consumeToken()
		if (token.symb === endBlockSymb) {
			block.shut = token
			return block
		}
		if (token.symb === NODE_SYMB.END_OF_FILE) {
			block.flag |= 0b1
			block.shut = token
			return block
		}
		block.list.push(consumeComponentValue(x, token))
	} while (true)
}
/**
 * @see https://drafts.csswg.org/css-syntax/#consume-function
 * @description § 5.4.8. Consume a function
 * Note: This algorithm assumes that the current input token has already been checked to be a <function-token>.
 *
 * To consume a function:
 *
 * Create a function with its name equal to the value of the current input token
 * and with its value initially set to an empty list.
 *
 * Repeatedly consume the next input token and process it as follows:
 *
 * <)-token>
 *    Return the function.
 * <EOF-token>
 *    This is a parse error. Return the function.
 * anything else
 *    Reconsume the current input token. Consume a component value
 *    and append the returned value to the function’s value.
 */
export function consumeFunction(x: Tokenizer, token?: CSSToken) {
	if (!token) token = x.consumeToken()

	const func = {
		type: 'CSSFunction',
		flag: 0,
		name: token,
		shut: null as any,
		list: [] as any[],
	}

	do {
		token = x.consumeToken()

		if (token.symb === NODE_SYMB.SHUT_PARENTHESIS_TOKEN) {
			func.shut = token
			return func
		}
		if (token.symb === NODE_SYMB.END_OF_FILE) {
			func.flag |= 0b1
			func.shut = token
			return func
		}
		func.list.push(consumeComponentValue(x, token))
	} while (true)
}
