import { Version } from '../enums'
import { Connection } from '../connection'
import { serializersV21, serializers } from '../serializers'
import { deserializers } from '../deserializers'

describe('connection', () => {
	function setupConnectionClass(v = Version.v23x) {
		const conn = new Connection('127.0.0.1', 5250, false)
		conn.version = v

		return conn
	}
	it('should use 2.1 serializers for 2.1 connection', () => {
		const conn = setupConnectionClass(Version.v21x)

		expect(conn['_getVersionedSerializers']()).toBe(serializersV21)
	})
	it('should use 2.3 serializers for 2.3 connection', () => {
		const conn = setupConnectionClass()

		expect(conn['_getVersionedSerializers']()).toBe(serializers)
	})
	it('should use 2.1 deserializers for 2.1 connection', () => {
		const conn = setupConnectionClass(Version.v21x)

		expect(conn['_getVersionedDeserializers']()).toBe(deserializers)
	})
	it('should use 2.3 deserializers for 2.3 connection', () => {
		const conn = setupConnectionClass()

		expect(conn['_getVersionedDeserializers']()).toBe(deserializers)
	})
})
