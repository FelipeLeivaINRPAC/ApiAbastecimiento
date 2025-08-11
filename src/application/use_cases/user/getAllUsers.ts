import IUserRepository from '../../../domain/repositories/IUserRepository.js'
import User from '../../../domain/entities/user.js'

export default class GetAllUsers {
	constructor(private repository: IUserRepository) {}

	async execute(): Promise<User[]> {
		return await this.repository.getAll()
	}
}
