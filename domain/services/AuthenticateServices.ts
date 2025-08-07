import ApiKey from '../entities/apiKey.js'
import IApiKey from '../repositories/IApiKey.js'

export default class AuthenticateServices {
  constructor(public repository: IApiKey) {
    this.repository = repository
  }

  async getAll() {
    return await this.repository.getAll()
  }

  private async getByHash(hash: string): Promise<ApiKey | null> {
    return await this.repository.getByHash(hash)
  }

  async validateApiKey(hash: string): Promise<boolean> {
    const apiKey = await this.getByHash(hash)

    if (!apiKey) return false
    if (!apiKey.isActive) return false

    return true
  }
}
