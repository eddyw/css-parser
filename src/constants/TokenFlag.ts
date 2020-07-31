export const enum FLAGS_ALL {
	IS_PARSE_ERROR = 1 << 0,
}
export const enum FLAGS_NUMBER {
	IS_PARSE_ERROR = 1 << 0,
	IS_INTEGER = 1 << 1,
	IS_DOUBLE = 1 << 2,
}
export const enum FLAGS_HASH {
	IS_PARSE_ERROR = 1 << 0,
	IS_ID = 1 << 1,
}
