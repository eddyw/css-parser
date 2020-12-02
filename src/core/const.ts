export const enum Code {
	EndOfFileMarker /*             */ = -1,
	ReplacementCharacter /*        */ = 0xfffd, // U+FFFD REPLACEMENT CHARACTER (�)
	MAXIMUM_ALLOWED_CODE_POINT /*  */ = 0x10ffff,
	/**
	 * Symbols
	 */
	LessThanSign /*                */ = 0x003c, // U+003C LESS-THAN SIGN (<)
	GreaterThanSign /*             */ = 0x003e, // U+003E GREATER-THAN SIGN (>)
	EqualsSign /*                  */ = 0x003d, // U+003D EQUALS-SIGN (=)
	CommercialAt /*                */ = 0x0040, // U+0040 COMMERCIAL AT (@)
	Control /*                     */ = 0x0080, // U+0080 <control>
	PlusSign /*                    */ = 0x002b, // U+002B PLUS SIGN (+)
	FullStop /*                    */ = 0x002e, // U+002E FULL STOP (.)
	SemiColon /*                   */ = 0x003b, // U+003B SEMICOLON (;)
	NumberSign /*                  */ = 0x0023, // U+0023 NUMBER SIGN (#)
	HyphenMinus /*                 */ = 0x002d, // U+002D HYPHEN-MINUS (-)
	Comma /*                       */ = 0x002c, // U+002C COMMA (,)
	Colon /*                       */ = 0x003a, // U+003A COLON (:)
	Asterisk /*                    */ = 0x002a, // U+002A ASTERISK (*)
	LowLine /*                     */ = 0x005f, // U+005F LOW LINE (_)
	PercentageSign /*              */ = 0x0025, // U+0025 PERCENTAGE SIGN (%)
	QuotationMark /*               */ = 0x0022, // U+0022 QUOTATION MARK (")
	Apostrophe /*                  */ = 0x0027, // U+0027 APOSTROPHE (')
	LeftParenthesis /*             */ = 0x0028, // U+0028 LEFT PARENTHESIS (()
	RightParenthesis /*            */ = 0x0029, // U+0029 RIGHT PARENTHESIS ())
	LeftCurlyBracket /*            */ = 0x007b, // U+007B LEFT CURLY BRACKET ({)
	RightCurlyBracket /*           */ = 0x007d, // U+007D RIGHT CURLY BRACKET (})
	LeftSquareBracket /*           */ = 0x005b, // U+005B LEFT SQUARE BRACKET ([)
	RightSquareBracket /*          */ = 0x005d, // U+005D RIGHT SQUARE BRACKET (])
	ReverseSolidus /*              */ = 0x005c, // U+005C REVERSE SOLIDUS (\)
	Solidus /*                     */ = 0x002f, // U+002F SOLIDUS (/)
	ExclamationMark /*             */ = 0x0021, // U+0021 EXCLAMATION MARK (!)
	VerticalLine /*                */ = 0x007c, // U+007c VERTICAL LINE (|)
	Ampersand /*                   */ = 0x0026, // U+0026 AMPERSAND (&)
	Infinity /*                    */ = 0x221e, // U+221E INFINITY (∞)
	QuestionMark /*                */ = 0x003f, // U+003F QUESTION MARK(?)
	DollarSign /*                  */ = 0x0024, // U+0024 DOLLAR SIGN ($)
	/**
	 * Newline & Whitespace
	 */
	CarriageReturn /*              */ = 0x000d, // U+000D CARRIAGE RETURN (CR) ('\r')
	FormFeed /*                    */ = 0x000c, // U+000C FORM FEED (FF) ('\f')
	LineFeed /*                    */ = 0x000a, // U+000A LINE FEED (LF) ('\n')
	CharacterTabulation /*         */ = 0x0009, // U+0009 CHARACTER TABULATION
	Space /*                       */ = 0x0020, // U+0020 SPACE
	/**
	 * Digits
	 */
	DigitZero /*                   */ = 0x0030, // U+0030 DIGIT ZERO (0)
	DigitOne /*                    */ = 0x0031, // U+0030 DIGIT ONE (1)
	DigitTwo /*                    */ = 0x0032, // U+0032 DIGIT TWO (2)
	DigitThree /*                  */ = 0x0033, // U+0033 DIGIT THREE (3)
	DigitFour /*                   */ = 0x0034, // U+0034 DIGIT FOUR (4)
	DigitFive /*                   */ = 0x0035, // U+0035 DIGIT FIVE (5)
	DigitSix /*                    */ = 0x0036, // U+0036 DIGIT SIX (6)
	DigitSeven /*                  */ = 0x0037, // U+0037 DIGIT SEVEN (7)
	DigitEight /*                  */ = 0x0038, // U+0038 DIGIT EIGHT (8)
	DigitNine /*                   */ = 0x0039, // U+0039 DIGIT NINE (9)
	/**
	 * Uppercase
	 */
	LatinCapitalLetterA /*         */ = 0x0041, // U+0041 LATIN CAPITAL LETTER A (A)
	LatinCapitalLetterB /*         */ = 0x0042, // U+0042 LATIN CAPITAL LETTER B (B)
	LatinCapitalLetterC /*         */ = 0x0043, // U+0043 LATIN CAPITAL LETTER C (C)
	LatinCapitalLetterD /*         */ = 0x0044, // U+0044 LATIN CAPITAL LETTER D (D)
	LatinCapitalLetterE /*         */ = 0x0045, // U+0045 LATIN CAPITAL LETTER E (E)
	LatinCapitalLetterF /*         */ = 0x0046, // U+0046 LATIN CAPITAL LETTER F (F)
	LatinCapitalLetterG /*         */ = 0x0047, // U+0047 LATIN CAPITAL LETTER G (G)
	LatinCapitalLetterH /*         */ = 0x0048, // U+0048 LATIN CAPITAL LETTER H (H)
	LatinCapitalLetterI /*         */ = 0x0049, // U+0049 LATIN CAPITAL LETTER I (I)
	LatinCapitalLetterJ /*         */ = 0x004a, // U+004A LATIN CAPITAL LETTER J (J)
	LatinCapitalLetterK /*         */ = 0x004b, // U+004B LATIN CAPITAL LETTER K (K)
	LatinCapitalLetterL /*         */ = 0x004c, // U+004C LATIN CAPITAL LETTER L (L)
	LatinCapitalLetterM /*         */ = 0x004d, // U+004D LATIN CAPITAL LETTER M (M)
	LatinCapitalLetterN /*         */ = 0x004e, // U+004E LATIN CAPITAL LETTER N (N)
	LatinCapitalLetterO /*         */ = 0x004f, // U+004F LATIN CAPITAL LETTER O (O)
	LatinCapitalLetterP /*         */ = 0x0050, // U+0050 LATIN CAPITAL LETTER P (P)
	LatinCapitalLetterQ /*         */ = 0x0051, // U+0051 LATIN CAPITAL LETTER Q (Q)
	LatinCapitalLetterR /*         */ = 0x0052, // U+0052 LATIN CAPITAL LETTER R (R)
	LatinCapitalLetterS /*         */ = 0x0053, // U+0053 LATIN CAPITAL LETTER S (S)
	LatinCapitalLetterT /*         */ = 0x0054, // U+0054 LATIN CAPITAL LETTER T (T)
	LatinCapitalLetterU /*         */ = 0x0055, // U+0055 LATIN CAPITAL LETTER U (U)
	LatinCapitalLetterV /*         */ = 0x0056, // U+0056 LATIN CAPITAL LETTER V (V)
	LatinCapitalLetterW /*         */ = 0x0057, // U+0057 LATIN CAPITAL LETTER W (W)
	LatinCapitalLetterX /*         */ = 0x0058, // U+0058 LATIN CAPITAL LETTER X (X)
	LatinCapitalLetterY /*         */ = 0x0059, // U+0059 LATIN CAPITAL LETTER Y (Y)
	LatinCapitalLetterZ /*         */ = 0x005a, // U+005A LATIN CAPITAL LETTER Z (Z)
	/**
	 * Lowercase
	 */
	LatinSmallLetterA /*           */ = 0x0061, // U+0061 LATIN SMALL LETTER A (a)
	LatinSmallLetterB /*           */ = 0x0062, // U+0062 LATIN SMALL LETTER B (b)
	LatinSmallLetterC /*           */ = 0x0063, // U+0063 LATIN SMALL LETTER C (c)
	LatinSmallLetterD /*           */ = 0x0064, // U+0064 LATIN SMALL LETTER D (d)
	LatinSmallLetterE /*           */ = 0x0065, // U+0065 LATIN SMALL LETTER E (e)
	LatinSmallLetterF /*           */ = 0x0066, // U+0066 LATIN SMALL LETTER F (f)
	LatinSmallLetterG /*           */ = 0x0067, // U+0067 LATIN SMALL LETTER G (g)
	LatinSmallLetterH /*           */ = 0x0068, // U+0068 LATIN SMALL LETTER H (h)
	LatinSmallLetterI /*           */ = 0x0069, // U+0069 LATIN SMALL LETTER I (i)
	LatinSmallLetterJ /*           */ = 0x006a, // U+006A LATIN SMALL LETTER J (j)
	LatinSmallLetterK /*           */ = 0x006b, // U+006B LATIN SMALL LETTER K (k)
	LatinSmallLetterL /*           */ = 0x006c, // U+006C LATIN SMALL LETTER L (l)
	LatinSmallLetterM /*           */ = 0x006d, // U+006D LATIN SMALL LETTER M (m)
	LatinSmallLetterN /*           */ = 0x006e, // U+006E LATIN SMALL LETTER N (n)
	LatinSmallLetterO /*           */ = 0x006f, // U+006F LATIN SMALL LETTER O (o)
	LatinSmallLetterP /*           */ = 0x0070, // U+0070 LATIN SMALL LETTER P (p)
	LatinSmallLetterQ /*           */ = 0x0071, // U+0071 LATIN SMALL LETTER Q (q)
	LatinSmallLetterR /*           */ = 0x0072, // U+0072 LATIN SMALL LETTER R (r)
	LatinSmallLetterS /*           */ = 0x0073, // U+0073 LATIN SMALL LETTER S (s)
	LatinSmallLetterT /*           */ = 0x0074, // U+0074 LATIN SMALL LETTER T (t)
	LatinSmallLetterU /*           */ = 0x0075, // U+0075 LATIN SMALL LETTER U (u)
	LatinSmallLetterV /*           */ = 0x0076, // U+0076 LATIN SMALL LETTER V (v)
	LatinSmallLetterW /*           */ = 0x0077, // U+0077 LATIN SMALL LETTER W (w)
	LatinSmallLetterX /*           */ = 0x0078, // U+0078 LATIN SMALL LETTER X (x)
	LatinSmallLetterY /*           */ = 0x0079, // U+0079 LATIN SMALL LETTER Y (y)
	LatinSmallLetterZ /*           */ = 0x007a, // U+007A LATIN SMALL LETTER Z (z)
	/**
	 * Non printable
	 */
	Null /*                        */ = 0x0000, // U+0000 NULL
	Backspace /*                   */ = 0x0008, // U+0008 BACKSPACE
	LineTabulation /*              */ = 0x000b, // U+000B LINE TABULATION
	ShiftOut /*                    */ = 0x000e, // U+000E SHIFT OUT
	InformationSeparatorOne /*     */ = 0x001f, // U+001F INFORMATION SEPARATOR ONE
	Delete /*                      */ = 0x007f, // U+007F DELETE
}
