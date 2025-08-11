import IUserRepository from '../../../domain/repositories/IUserRepository.js'

export default class DeleteUser {
	constructor(private repository: IUserRepository) {}

	async execute(id: number): Promise<boolean> {
		return await this.repository.delete(id)
	}
}
