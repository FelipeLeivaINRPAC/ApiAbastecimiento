import IProductRepository, {
	IUpdateProduct,
} from '../../../domain/repositories/IProductRepository.js'

export default class UpdateProduct {
	constructor(private repository: IProductRepository) {
		this.repository = repository
	}

	async execute({ id, name, stock }: IUpdateProduct) {
		return await this.repository.update({ id, name, stock })
	}
}
