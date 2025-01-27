import { authTokenService } from '@/services/auth-token.service'
import axios, { type CreateAxiosDefaults } from 'axios'
import { errorCatch } from './error'

const options: CreateAxiosDefaults = {
	baseURL: 'https://spotify-server-api-28ab9bd01e44.herokuapp.com',
	headers: {
		'Content-Type': 'application/json',
	},
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = authTokenService.getAccessToken()

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await authTokenService.getRefreshToken()
				return axiosWithAuth.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired')
					authTokenService.removeAccessToken()
			}
		}
		throw error
	}
)

export { axiosClassic, axiosWithAuth }
