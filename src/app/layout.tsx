import ClientProviders from '@/components/provider/ClientProvider'
import '@/styles/globals.scss'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
	variable: '--font-poppins',
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={poppins.variable}>
				<ClientProviders>{children}</ClientProviders>
			</body>
		</html>
	)
}
