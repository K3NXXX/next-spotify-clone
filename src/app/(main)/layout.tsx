import { Header } from '@/components/main/Header/Header'

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div style={{padding: "0 15px", backgroundColor: "black"}}>
			<Header/>
			{children}
		</div>
	)
}