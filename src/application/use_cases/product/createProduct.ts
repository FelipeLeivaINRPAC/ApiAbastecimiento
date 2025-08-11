import Product from '../../../domain/entities/product.js'
import IProductRepository, {
	ICreateProduct,
} from '../../../domain/repositories/IProductRepository.js'

export default class CreateProduct {
	constructor(private repository: IProductRepository) {
		this.repository = repository
	}

	async execute({ name, stock }: ICreateProduct): Promise<Product | null> {
		return await this.repository.create({ name, stock })
	}
}
