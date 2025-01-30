import { IEmailCode, ILogin, ISignUp } from '@/@types/auth.types'
import { axiosClassic } from '@/axios/interceptors'

class AuthService {
	async signup(signupData: ISignUp) {
		const { data } = await axiosClassic.post(`/auth/signup`, signupData)
		return data
	}

	async login(loginData: ILogin) {
		const { data } = await axiosClassic.post(`/auth/login`, loginData)
		return data
	}

	async emailVerification(token: IEmailCode) {
		const { data } = await axiosClassic.post(`/auth/confirmation`, token)
		return data
	}

	async logout() {
		const { data } = await axiosClassic.post(`/auth/logout`)
		return data
	}

	async googleAuth() {
		const { data } = await axiosClassic.get(`/auth/google`)
		return data
	}

	async facebookAuth() {
		const { data } = await axiosClassic.get(`/auth/facebook`)
		return data
	}
}

export const authService = new AuthService()
