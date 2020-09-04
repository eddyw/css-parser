export const enum NEWLINE {
	CR = 0x000d, // U+000D CARRIAGE RETURN (CR)
	FF = 0x000c, // U+000C FORM FEED (FF)
	LF = 0x000a, // U+000A LINE FEED (LF)
}
export const enum WHITESPACE {
	TAB = 0x0009, // U+0009 CHARACTER TABULATION
	SPC = 0x0020, // U+0020 SPACE
}
export const enum DIGIT {
	ZERO = 0x0030, // U+0030 DIGIT ZERO (0)
	NINE = 0x0039, // U+0039 DIGIT NINE (9)
}
export const enum UPPERCASE {
	A = 0x0041, // U+0041 LATIN CAPITAL LETTER A (A)
	Z = 0x005a, // U+005A LATIN CAPITAL LETTER Z (Z)
	E = 0x0045, // U+0045 LATIN CAPITAL LETTER E (E)
	F = 0x0046, // U+0046 LATIN CAPITAL LETTER F (F)
	U = 0x0055, // U+0055 LATIN CAPITAL LETTER U (U)
	R = 0x0052, // U+0052 LATIN CAPITAL LETTER R (R)
	L = 0x004c, // U+004c LATIN CAPITAL LETTER L (L)
}
export const enum LOWERCASE {
	A = 0x0061, // U+0061 LATIN SMALL LETTER A (A)
	Z = 0x007a, // U+007A LATIN SMALL LETTER Z (Z)
	E = 0x0065, // U+0045 LATIN SMALL LETTER E (E)
	F = 0x0066, // U+0046 LATIN SMALL LETTER F (F)
	L = 0x006c, // U+0046 LATIN SMALL LETTER L (L)
	R = 0x0072, // U+0055 LATIN SMALL LETTER R (R)
	U = 0x0075, // U+0055 LATIN SMALL LETTER U (U)
}
export const enum NON_PRINTABLE {
	NULL = 0x0000, // U+0000 NULL
	BACK = 0x0008, // U+0008 BACKSPACE
	LTAB = 0x000b, // U+000B LINE TABULATION
	SHFT = 0x000e, // U+000E SHIFT OUT
	INFO = 0x001f, // U+001F INFORMATION SEPARATOR ONE
	DELT = 0x007f, // U+007F DELETE
}
export const enum TOKEN {
	EOF = -1, // No char code as EOF
	LESS_THAN = 0x003c, // U+003C LESS-THAN SIGN (<)
	GREATER_THAN = 0x003e, // U+003E GREATER-THAN SIGN (>)
	AT = 0x0040, // U+0040 COMMERCIAL AT (@)
	CTRL = 0x0080, // U+0080 <control>
	PLUS = 0x002b, // U+002B PLUS SIGN (+)
	STOP = 0x002e, // U+002E FULL STOP (.)
	SEMI = 0x003b, // U+003B SEMICOLON (;)
	HASH = 0x0023, // U+0023 NUMBER SIGN (#)
	MINUS = 0x002d, // U+002D HYPHEN-MINUS (-)
	COMMA = 0x002c, // U+002C COMMA (,)
	COLON = 0x003a, // U+003A COLON (:)
	ASTERISK = 0x002a, // U+002A ASTERISK (*)
	LOW_LINE = 0x005f, // U+005F LOW LINE (_)
	PERCENTAGE = 0x0025, // U+0025 PERCENTAGE SIGN (%)
	DOUBLE_QUOTE = 0x0022, // U+0022 QUOTATION MARK (")
	SINGLE_QUOTE = 0x0027, // U+0027 APOSTROPHE (')
	L_PARENTHESIS = 0x0028, // U+0028 LEFT PARENTHESIS (()
	R_PARENTHESIS = 0x0029, // U+0029 RIGHT PARENTHESIS ())
	L_CURLY_BRACKET = 0x007b, // U+007B LEFT CURLY BRACKET ({)
	R_CURLY_BRACKET = 0x007d, // U+007D RIGHT CURLY BRACKET (})
	L_SQUARE_BRACKET = 0x005b, // U+005B LEFT SQUARE BRACKET ([)
	R_SQUARE_BRACKET = 0x005d, // U+005D RIGHT SQUARE BRACKET (])
	REVERSE_SOLIDUS = 0x005c, // U+005C REVERSE SOLIDUS (\)
	FORWARD_SOLIDUS = 0x002f, // U+002F SOLIDUS (/)
	EXCLAMATION = 0x0021, // U+0021 EXCLAMATION MARK (!)
	VERTICAL_LINE = 0x007c, // U+007c VERTICAL LINE (|)
	AMPERSAND = 0x0026, // U+0026 AMPERSAND (&)
	INFINITY = 0x221e, // U+221E INFINITY (∞)
	QUESTION = 0x003f, // U+003F QUESTION MARK(?)
}
