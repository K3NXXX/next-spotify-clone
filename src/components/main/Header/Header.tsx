'use client'
import { PAGES } from '@/constants/pages.constants'
import { useLogoutMutation } from '@/hooks/auth/useLogoutMutation'
import { Menu, MenuItem } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FaSpotify } from 'react-icons/fa'
import { GoHome, GoHomeFill } from 'react-icons/go'
import { IoBrowsersOutline } from 'react-icons/io5'
import { RiCloseLargeFill, RiSearchLine } from 'react-icons/ri'
import styles from './Header.module.scss'

export function Header() {
	const currentPath = usePathname()
	const userData = JSON.parse(localStorage.getItem('userData') ?? '')
	const [searchValue, setSearchValue] = useState('')
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const { mutate } = useLogoutMutation()
	const handleClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<header className={styles.root}>
			<Link href={PAGES.HOME}>
				<FaSpotify color='white' size={35} />
			</Link>
			<div className={styles.search}>
				<div className={styles.iconWrapper}>
					{currentPath === PAGES.HOME ? (
						<GoHomeFill className={styles.homeIcon} />
					) : (
						<GoHome className={styles.homeIcon} />
					)}
				</div>
				<div className={styles.inputWrapper}>
					<RiSearchLine className={styles.searchIcon} />
					{searchValue.length > 0 ? (
						<RiCloseLargeFill
							onClick={() => setSearchValue('')}
							className={styles.iconClose}
						/>
					) : (
						<IoBrowsersOutline className={styles.browseIcon} />
					)}

					<input
						onChange={e => setSearchValue(e.target.value)}
						value={searchValue}
						type='text'
						placeholder='What do you want to play?'
					/>
				</div>
			</div>
			<div>
				<p onClick={handleClick} className={styles.name}>
					{userData.name[0]}
				</p>
			</div>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				sx={{
					'& .MuiMenu-paper': {
						marginTop: '10px',
						width: '200px',
						background: '#1f1f1f',
					},
				}}
			>
				<MenuItem
					onClick={handleClose}
					sx={{
						color: 'white',
						fontSize: '14px',
						padding: '10px 20px',
					}}
				>
					Account
				</MenuItem>
				<MenuItem
					onClick={() => mutate()}
					sx={{
						color: 'white',
						fontSize: '14px',
						padding: '10px 20px',
					}}
				>
					Logout
				</MenuItem>
			</Menu>
		</header>
	)
}
