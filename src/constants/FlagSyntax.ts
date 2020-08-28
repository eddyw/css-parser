export const enum FLAG_ANY {
	PARSE_ERROR = 1 << 0,
}
export const enum FLAG_NUMBER {
	PARSE_ERROR = 1 << 0,
	INTEGER = 1 << 1,
	DOUBLE = 1 << 2,
}
export const enum FLAG_STRING {
	PARSE_ERROR = 1 << 0,
	BAD_STRING = 1 << 1,
	END_IS_EOF = 1 << 2,
	END_IS_ESCAPED_EOF = 1 << 3,
	END_IS_NEWLINE = 1 << 4,
}
export const enum FLAG_IDENTIFIER {
	PARSE_ERROR = 1 << 0,
	FUNCTION_NAME = 1 << 1,
	HASH_IDENT = 1 << 2,
}
export const enum FLAG_URL {
	PARSE_ERROR = 1 << 0,
	BAD_URL = 1 << 1,
	END_IS_EOF = 1 << 2,
	NON_PRINTABLE = 1 << 3,
	BAD_ESCAPE = 1 << 4,
}
