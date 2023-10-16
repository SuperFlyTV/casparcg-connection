import { ParserOptions, parseStringPromise } from 'xml2js'

export const deserializeXML = async (line: string, options?: ParserOptions): Promise<any> => {
	return await parseStringPromise(line, options) // todo - this seems to get stuck when we pass it non-xml
}

export function parseString(object: any, key: string): string | undefined
export function parseString(object: any, key: string, defaultValue: string): string
export function parseString(
	object: Record<string | number, any> | undefined,
	key: string,
	defaultValue?: string
): string | undefined {
	const value = object?.[key]?.[0]?._
	return value?.toString() ?? defaultValue
}

export function parseNumber(object: any, key: string): number | undefined
export function parseNumber(object: any, key: string, defaultValue: number): number
export function parseNumber(
	object: Record<string | number, any> | undefined,
	key: string,
	defaultValue?: number
): number | undefined {
	const value = object?.[key]?.[0]?._
	if (value === undefined) return defaultValue
	if (typeof value === 'number') return value
	const parsed = parseFloat(value)
	return isNaN(parsed) ? defaultValue : parsed
}

export function parseBoolean(object: any, key: string): boolean | undefined
export function parseBoolean(object: any, key: string, defaultValue?: boolean): boolean
export function parseBoolean(
	object: Record<string | number, any> | undefined,
	key: string,
	defaultValue?: boolean
): boolean | undefined {
	const value = object?.[key]?.[0]?._
	if (value === undefined) return defaultValue
	return value?.toString()?.trim()?.toLowerCase() === 'true'
}
