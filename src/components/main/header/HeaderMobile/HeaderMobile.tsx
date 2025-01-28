import { FaSpotify } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { PiClockCountdownBold } from 'react-icons/pi'
import styles from './HeaderMobile.module.scss'
import Link from 'next/link'
import { PAGES } from '@/constants/pages.constants'

export function HeaderMobile() {
	return (
		<header className={styles.root}>
			<Link href={PAGES.HOME}>
				<FaSpotify color='white' size={35} />
			</Link>
			<div className={styles.icons}>
				<PiClockCountdownBold size={27} />
				<FiSettings size={26} />
			</div>
		</header>
	)
}
