export const enum Kind {
	Group,
	Function,
	Keyword,
  AtKeyword,
  AtFunction,
	Combinator,
	Multiplier,
	Type,
	TypeReference,
	String,
	Space,
	Token,
  Comma,
  Slash,
	Required,
	Delimiter,
	OpenBracket,
	ShutBracket,
}
export const KindText = {
	[Kind.Group]: 'Group',
	[Kind.Function]: 'Function',
	[Kind.Keyword]: 'Keyword',
	[Kind.AtKeyword]: 'AtKeyword',
	[Kind.AtFunction]: 'AtFunctionOrGroup',
	[Kind.Combinator]: 'Combinator',
	[Kind.Multiplier]: 'Multiplier',
	[Kind.Type]: 'Type',
	[Kind.TypeReference]: 'TypeReference',
	[Kind.String]: 'String',
	[Kind.Space]: 'Whitespace',
	[Kind.Token]: 'Token', // Why token?
	[Kind.Comma]: 'Comma',
	[Kind.Slash]: 'ForwardSlash',
	[Kind.Required]: 'RequiredGroup', // Why is this a type?
	[Kind.Delimiter]: 'Delimiter',
	[Kind.OpenBracket]: 'OpenBrackets', // Why is this a type?
	[Kind.ShutBracket]: 'ShutBrackets', // WHy is this a type?
}

export const enum KindCombinator {
	Juxtapose = 1,
	Ampersand = 2,
	BarDouble = 3,
	BarSingle = 4,
}
export const KindCombinatorText = {
	[KindCombinator.Juxtapose]: 'Juxtapose',
	[KindCombinator.Ampersand]: 'Ampersand',
	[KindCombinator.BarDouble]: 'BarDouble',
	[KindCombinator.BarSingle]: 'BarSingle',
}
