import { Login } from '@/components/auth/Login/Login'
import { SITE_NAME } from '@/constants/seo.constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Login',
	description: `${SITE_NAME} login page`,
}

export default function LoginPage() {
	return <Login />
}
