import User from '../entities/user.js'
import bcrypt from 'bcrypt'
import { ICreateUser } from '../repositories/IUserRepository.js'

export default class UserFactory {
	private static currentId = 1

	static create({ rut, dv, name, lastname, email }: ICreateUser) {
		if (!rut || !dv || !name || !lastname || !email) {
			throw new Error('Datos incorrectos')
		}

		const hashedPassword = bcrypt.hashSync(rut.toString().slice(0, 4), 10)
		const now = new Date()

		return new User(
			this.currentId++,
			rut,
			dv,
			name,
			lastname,
			email,
			hashedPassword,
			true,
			now,
			now
		)
	}
}
