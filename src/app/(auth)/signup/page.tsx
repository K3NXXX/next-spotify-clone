import { Signup } from '@/components/auth/Signup/Signup'
import { SITE_NAME } from '@/constants/seo.constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Sign up',
	description: `${SITE_NAME} registration page`
  }

export default function SignupPage() {
	return <Signup/>
}