import ApiKey from '../../../domain/entities/apiKey.js'
import ApiKeyFactory from '../../../domain/factories/apiKeyFactory.js'
import IApiKey from '../../../domain/repositories/IApiKey.js'

export default class AuthenticateRepository implements IApiKey {
	public apiKeys: ApiKey[]
	public id: number = 4

	constructor() {
		const now = new Date()
		this.apiKeys = [
			ApiKeyFactory.create(
				1,
				'APIKEY_iox2SItCXAmTfrsUDozTXq0Euf9Dqm3d',
				now,
				this.calculateExpirationDate(now),
				true
			),
			ApiKeyFactory.create(
				2,
				'APIKEY_FAnXT60LnydW9vV5xp2fG8dA43Xd61TW',
				now,
				this.calculateExpirationDate(now),
				true
			),
			ApiKeyFactory.create(
				3,
				this.generateApiKey(),
				now,
				this.calculateExpirationDate(now),
				true
			),
		]
	}

	async getAll(): Promise<ApiKey[]> {
		return this.apiKeys
	}

	async getByHash(hash: string): Promise<ApiKey | null> {
		const apiKey = this.apiKeys.find(apiKey => {
			return apiKey.hash === hash
		})
		return apiKey ? apiKey : null
	}

	async getById(id: number): Promise<ApiKey | null> {
		const apiKey = this.apiKeys.find(apiKey => {
			return apiKey.id === id
		})
		return apiKey ? apiKey : null
	}

	async create(): Promise<ApiKey | null> {
		const now = new Date()
		const apiKey = ApiKeyFactory.create(
			this.id,
			this.generateApiKey(),
			now,
			this.calculateExpirationDate(now),
			true
		)
		if (!apiKey) return null

		this.id++
		this.apiKeys.push(apiKey)
		return apiKey
	}

	async delete(id: number): Promise<boolean> {
		const itemsBeforeDelete = this.apiKeys.length
		this.apiKeys = this.apiKeys.filter(apiKey => apiKey.id !== id)
		return itemsBeforeDelete !== this.apiKeys.length
	}

	private generateApiKey(prefix = 'APIKEY', length = 32): string {
		const chars =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		let key = ''
		for (let i = 0; i < length; i++) {
			key += chars.charAt(Math.floor(Math.random() * chars.length))
		}

		return `${prefix}_${key}`
	}

	private calculateExpirationDate(createdAt: Date): Date {
		const expireAt = new Date(createdAt)
		expireAt.setFullYear(expireAt.getFullYear() + 1)
		return expireAt
	}
}
