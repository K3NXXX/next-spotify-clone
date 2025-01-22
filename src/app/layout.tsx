import { Poppins } from 'next/font/google'
import "@/styles/globals.scss"

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
			<body className={poppins.variable}>{children}</body>
		</html>
	)
}
