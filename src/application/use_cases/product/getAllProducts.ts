import Product from '../../../domain/entities/product.js'
import IProductRepository from '../../../domain/repositories/IProductRepository.js'

export default class GetAllProducts {
	constructor(private repository: IProductRepository) {
		this.repository = repository
	}

	async execute(): Promise<Product[]> {
		return await this.repository.getAll()
	}
}
