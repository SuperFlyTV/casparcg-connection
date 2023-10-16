export function literal<T>(o: T): T {
	return o
}

export function ensureArray<T>(v: T | T[]): T[] {
	return Array.isArray(v) ? v : [v]
}

export function compact<T>(array: (T | undefined)[]): T[] {
	return array.filter((item) => item !== undefined) as T[]
}
