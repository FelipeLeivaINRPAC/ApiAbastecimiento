import Product from '../entities/product.js'

export interface ICreateProduct {
	name: string
	stock: number
}

export interface IUpdateProduct {
	id: number
	name: string
	stock: number
}

export default interface IProductRepository {
	getAll(): Promise<Product[]>
	getById(id: number): Promise<Product | null>
	create({ name, stock }: ICreateProduct): Promise<Product | null>
	update({ id, name, stock }: IUpdateProduct): Promise<Product | null>
	delete(id: number): Promise<boolean>
}
