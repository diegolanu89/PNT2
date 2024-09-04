import { ApiMockController } from './ApiMockController'
import { ApiParams } from './ApiParameters'
import { ApiProdController } from './ApiProdController'

const apiOptions: any = {
	[ApiParams.DEVELOPMENT]: new ApiMockController(ApiParams.BASE_MOCK),
	[ApiParams.PROD]: new ApiProdController(ApiParams.BASE_PROD),
	[ApiParams.HOMO]: new ApiProdController(ApiParams.BASE_HOMO),
}

export const Api = () => {
	const ENVIRONMENT = import.meta.env.VITE_NODE_ENV
	return apiOptions[ENVIRONMENT]
}
