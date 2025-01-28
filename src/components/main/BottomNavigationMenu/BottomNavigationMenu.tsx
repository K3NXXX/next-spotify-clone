import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { useState } from 'react'
import { GoHomeFill } from 'react-icons/go'
import { MdOutlineVideoLibrary } from 'react-icons/md'
import { RiSearchLine } from 'react-icons/ri'
import styles from './BottomNavigationMenu.module.scss'

export function BottomNavigationMenu() {
	const [value, setValue] = useState(0)
	return (
		<div className={styles.root}>
			<BottomNavigation
				className={styles.menu}
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue)
				}}
			>
				<BottomNavigationAction
					className={styles.label}
					label='Home'
					icon={<GoHomeFill className={styles.icon}  />}
				/>
				<BottomNavigationAction
					label='Search'
					className={styles.label}
					icon={<RiSearchLine  className={styles.icon}   />}
				/>
				<BottomNavigationAction
					className={styles.label}
					label='Your library'
					icon={<MdOutlineVideoLibrary  className={styles.icon} />}
				/>
			</BottomNavigation>
		</div>
	)
}
