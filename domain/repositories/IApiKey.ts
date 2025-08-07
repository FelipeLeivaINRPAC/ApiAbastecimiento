import ApiKey from '../entities/apiKey.js'

export default interface IApiKey {
  getAll(): Promise<ApiKey[]>
  getByHash(hash: string): Promise<ApiKey | null>
  getById(id: number): Promise<ApiKey | null>
  create(): Promise<ApiKey | null>
  delete(id: number): Promise<boolean>
}
