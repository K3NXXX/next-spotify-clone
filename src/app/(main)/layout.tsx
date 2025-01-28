'use client'
import { BottomNavigationMenu } from '@/components/main/BottomNavigationMenu/BottomNavigationMenu'
import { HeaderDesktop } from '@/components/main/header/HeaderDesktop/HeaderDesktop'
import { HeaderMobile } from '@/components/main/header/HeaderMobile/HeaderMobile'
import styles from './mainLayout.module.scss'

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div
			className={styles.root}
		
		>
			<div>
				<HeaderMobile />
				<HeaderDesktop />
			</div>
			{children}
			<BottomNavigationMenu />
		</div>
	)
}
