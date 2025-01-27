import { Home } from '@/components/main/Home/Home'
import { SITE_NAME } from '@/constants/seo.constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Home',
	description: `${SITE_NAME} home page`,
}

export default function HomPage() {
	return <Home />
}
