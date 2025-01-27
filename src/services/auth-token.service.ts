import { axiosWithAuth } from '@/axios/interceptors'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
}
class AuthTokenService {
	saveAccessToken(accessToken: string) {
		const token = localStorage.setItem(EnumTokens.ACCESS_TOKEN, accessToken)
		return token
	}

	getAccessToken() {
		const token = localStorage.getItem(EnumTokens.ACCESS_TOKEN)
		return token
	}

	removeAccessToken() {
		localStorage.removeItem(EnumTokens.ACCESS_TOKEN)
	}

	async getRefreshToken() {
		const { data } = await axiosWithAuth.post(`/auth/refresh-token`)
		return data
	}
}

export const authTokenService = new AuthTokenService()
