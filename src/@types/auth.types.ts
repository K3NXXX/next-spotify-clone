export interface ISignUp {
	name: string
	email: string
	password: string
	passwordConfirm: string
}

export interface ILogin {
	email: string
	password: string
}

export interface IEmailCode {
	token: string
}
