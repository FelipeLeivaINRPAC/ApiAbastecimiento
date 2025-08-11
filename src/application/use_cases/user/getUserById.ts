import User from '../../../domain/entities/user.js'
import IUserRepository from '../../../domain/repositories/IUserRepository.js'

export default class GetUserById {
	constructor(private repository: IUserRepository) {}

	async execute(id: number): Promise<User | null> {
		return await this.repository.getById(id)
	}
}
