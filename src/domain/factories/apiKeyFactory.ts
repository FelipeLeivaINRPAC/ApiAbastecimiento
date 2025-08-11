import ApiKey from '../entities/apiKey.js'

export default class ApiKeyFactory {
	public static create(
		id: number,
		hash: string,
		createdAt: Date,
		expireAt: Date,
		isActive: boolean
	) {
		if (!hash) throw new Error('Error al crear Api Key')

		return new ApiKey(id, hash, createdAt, expireAt, isActive)
	}
}
