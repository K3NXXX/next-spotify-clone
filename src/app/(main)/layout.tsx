'use client'

import { BottomNavigationMenu } from '@/components/main/BottomNavigationMenu/BottomNavigationMenu'
import { HeaderDesktop } from '@/components/main/header/HeaderDesktop/HeaderDesktop'
import { HeaderMobile } from '@/components/main/header/HeaderMobile/HeaderMobile'
import { PlaylistsDesktop } from '@/components/main/playlists/PlaylistsDesktop/PlaylistsDesktop'
import { useRef } from 'react'
import {
	type ImperativePanelHandle,
	Panel,
	PanelGroup,
	PanelResizeHandle,
} from 'react-resizable-panels'
import styles from './mainLayout.module.scss'

export default function MainLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const panelRef = useRef<ImperativePanelHandle | null>(null)

	return (
		<div className={styles.root}>
			<div>
				<HeaderMobile />
				<HeaderDesktop />
			</div>
			<main className={styles.main}>
				<PanelGroup direction='horizontal'>
					<Panel ref={panelRef} defaultSize={20} minSize={15} maxSize={50}>
						<PlaylistsDesktop panelRef={panelRef} />
					</Panel>
					<PanelResizeHandle className={styles.resizeHandle} />
					<Panel order={2} minSize={20} defaultSize={80}>
						{children}
					</Panel>
				</PanelGroup>
			</main>
			<BottomNavigationMenu />
		</div>
	)
}
