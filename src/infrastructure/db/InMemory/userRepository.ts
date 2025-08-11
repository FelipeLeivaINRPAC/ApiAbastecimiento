import IUserRepository, {
	ICreateUser,
	IUpdateUser,
} from '../../../domain/repositories/IUserRepository.js'
import UserFactory from '../../../domain/factories/userFactory.js'
import bcrypt from 'bcrypt'
import User from '../../../domain/entities/user.js'

export default class UserRepository implements IUserRepository {
	private users: User[]

	constructor() {
		this.users = [
			UserFactory.create(
				8899774,
				'0',
				'Usuario 1',
				'Lastname 1',
				'email_1@gmail.com'
			),

			UserFactory.create(
				15481243,
				'9',
				'Usuario 2',
				'Lastname 2',
				'email_2@gmail.com'
			),
		]
	}

	async getAll() {
		return this.users
	}

	async getById(id: number) {
		const user = this.users.find(user => user.id === Number(id))
		return user ?? null
	}

	async create({ rut, dv, name, lastname, email }: ICreateUser) {
		const user = UserFactory.create(rut, dv, name, lastname, email)

		if (!user) return null

		this.users.push(user)
		return user
	}

	async update({
		id,
		rut,
		dv,
		name,
		lastname,
		email,
		password,
		isActive,
	}: IUpdateUser) {
		const user = this.users.find(user => user.id === Number(id))
		if (!user) return null

		if (rut && user.rut !== rut) {
			user.rut = rut
			user.dv = dv
		}
		if (name && user.name !== name) user.name = name
		if (lastname && user.lastname !== lastname) user.lastname = lastname
		if (email && user.email !== email) user.email = email
		if (password) {
			const passwordHash = bcrypt.hashSync(password, 10)
			if (user.password !== passwordHash) user.password = passwordHash
		}
		if (isActive && user.isActive !== isActive) user.isActive = isActive

		return user
	}

	async delete(id: number) {
		const usersBeforeDelete = this.users.length
		this.users = this.users.filter(user => user.id !== Number(id))
		const usersAfterDelete = this.users.length

		return usersBeforeDelete !== usersAfterDelete
	}
}
