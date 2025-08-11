import User from '../../../domain/entities/user.js'
import IUserRepository, {
	ICreateUser,
} from '../../../domain/repositories/IUserRepository.js'
import CalculateDv from '../../../infrastructure/api/utils/rutHelper.js'

export default class CreateUser {
	constructor(private repository: IUserRepository) {}

	async execute({
		rut,
		name,
		lastname,
		email,
	}: ICreateUser): Promise<User | null> {
		const dv = await CalculateDv(rut)
		return await this.repository.create({ rut, dv, name, lastname, email })
	}
}
