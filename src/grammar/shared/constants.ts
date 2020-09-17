export const enum SyntaxKind {
	Group,
	Function,
	Keyword,
	AtKeyword,
	Combinator,
	Multiplier,
	Type,
	TypeReference,
	String,
	Space,
	Token,
	Comma,
	Required,
	Delimiter,
	OpenBracket,
	ShutBracket,
}
export const SyntaxKindText = {
	[SyntaxKind.Group]: 'Group',
	[SyntaxKind.Function]: 'Function',
	[SyntaxKind.Keyword]: 'Keyword',
	[SyntaxKind.AtKeyword]: 'AtKeyword',
	[SyntaxKind.Combinator]: 'Combinator',
	[SyntaxKind.Multiplier]: 'Multiplier',
	[SyntaxKind.Type]: 'Type',
	[SyntaxKind.TypeReference]: 'TypeReference',
	[SyntaxKind.String]: 'String',
	[SyntaxKind.Space]: 'Whitespace',
	[SyntaxKind.Token]: 'Token', // Why token?
	[SyntaxKind.Comma]: 'Comma',
	[SyntaxKind.Required]: 'RequiredGroup', // Why is this a type?
	[SyntaxKind.Delimiter]: 'Delimiter',
	[SyntaxKind.OpenBracket]: 'OpenBrackets', // Why is this a type?
	[SyntaxKind.ShutBracket]: 'ShutBrackets', // WHy is this a type?
}

export const enum SyntaxCombinatorKind {
	Juxtapose = 1,
	Ampersand = 2,
	BarDouble = 3,
	BarSingle = 4,
}
export const SyntaxCombinatorKindText = {
	[SyntaxCombinatorKind.Juxtapose]: 'Juxtapose',
	[SyntaxCombinatorKind.Ampersand]: 'Ampersand',
	[SyntaxCombinatorKind.BarDouble]: 'BarDouble',
	[SyntaxCombinatorKind.BarSingle]: 'BarSingle',
}
