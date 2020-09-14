export const enum GRAMMAR_SYMB {
	IDENTIFIER = 1,
	FUNCTION,
	TYPE,
	TYPE_REF,
	STRING,
	OPEN_SQUARE_BRACKET,
	SHUT_SQUARE_BRACKET,
	MULTIPLIER,
	WHITESPACE,
	TOKEN,
	COMBINATOR,
	COMMA,
	GROUP,
	REQUIRED,
}
export const enum GRAMMAR_TYPE {
	IDENTIFIER = 'Identifier',
	FUNCTION = 'Function',
	TYPE = 'Type',
	TYPE_REF = 'TypeRef',
	STRING = 'String',
	OPEN_SQUARE_BRACKET = 'SyntaxOpenGroup',
	SHUT_SQUARE_BRACKET = 'SyntaxShutGroup',
	MULTIPLIER = 'Multiplier',
	WHITESPACE = 'Space',
	TOKEN = 'Token',
	COMBINATOR = 'Combinator',
	COMMA = 'Comma',
	GROUP = 'Group',
	REQUIRED = 'REQUIRED',
}

/**
 * Sorted by priority and intentionally starts with 0
 */
export const enum GRAMMAR_COMBINATOR {
	JUXTAPOSE = 0,
	AMPERSAND,
	VL_DOUBLE,
	VL_SINGLE,
}
