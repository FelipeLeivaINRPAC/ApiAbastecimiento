import User from '../entities/user.js'

export interface ICreateUser {
	rut: number
	dv: string
	name: string
	lastname: string
	email: string
}

export interface IUpdateUser {
	id: number
	rut: number
	dv: string
	name: string
	lastname: string
	email: string
	password: string
	isActive: boolean
}

export default interface IUserRepository {
	getAll(): Promise<User[]>
	getById(id: number): Promise<User | null>
	create({ rut, dv, name, lastname, email }: ICreateUser): Promise<User | null>
	update({
		id,
		rut,
		dv,
		name,
		lastname,
		email,
		password,
		isActive,
	}: IUpdateUser): Promise<User | null>
	delete(id: number): Promise<boolean>
}
