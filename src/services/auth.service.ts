import { ISignUp } from '@/@types/auth.types'
import axios from 'axios'

class AuthService {
	private BASE_URL = 'https://spotify-server-api-28ab9bd01e44.herokuapp.com'

	async saveAccessToken(accessToken: string) {
		try {
			const token = localStorage.setItem('accessToken', accessToken)
			return token
		} catch (error) {
			console.error('Error retrieving access token:', error)
			return null
		}
	}

	async signup(signupData: ISignUp) {
		const { data } = await axios.post(
			`${this.BASE_URL}/auth/signup`,
			signupData
		)
		return data
	}
	// async login(loginData: ILoginData) {
	// 	const { data } = await axios.post(`${this.BASE_URL}/auth/login`, loginData)
	// 	return data
	// }
	// async emailVerification(token: IConfirmCode) {
	// 	const { data } = await axios.post(
	// 		`${this.BASE_URL}/auth/confirmation`,
	// 		token
	// 	)
	// 	return data
	// }
}

export const authService = new AuthService()
