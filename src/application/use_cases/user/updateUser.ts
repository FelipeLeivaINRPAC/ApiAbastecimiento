import User from '../../../domain/entities/user.js'
import IUserRepository, {
	IUpdateUser,
} from '../../../domain/repositories/IUserRepository.js'
import CalculateDv from '../../../infrastructure/api/utils/rutHelper.js'

export default class UpdateUser {
	constructor(private repository: IUserRepository) {}

	async execute({
		id,
		rut,
		name,
		lastname,
		email,
		password,
		isActive,
	}: IUpdateUser): Promise<User | null> {
		const dv = await CalculateDv(rut)
		return await this.repository.update({
			id,
			rut,
			dv,
			name,
			lastname,
			email,
			password,
			isActive,
		})
	}
}
