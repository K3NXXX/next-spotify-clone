import CustomTooltip from '@/ui/CustomTooltip/CustomTooltip'
import { Menu, MenuItem } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
import { MdOutlineVideoLibrary } from 'react-icons/md'
import { PiMusicNotesPlusBold } from 'react-icons/pi'
import styles from './PlaylistsDesktop.module.scss'
import { FaRegFolder } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";

interface IPlaylistsDesktopProps {
	panelRef: any
}

export function PlaylistsDesktop({ panelRef}: IPlaylistsDesktopProps) {
	const [isExpand, setIsExpand] = useState(false)
	const [isWide, setIsWide] = useState(false)
	const panelWrapperRef = useRef<HTMLDivElement>(null)

	const [anchorEl, setAnchorEl] = useState<null | SVGElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<SVGElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	useEffect(() => {
		const resizeObserver = new ResizeObserver(() => {
			if (panelWrapperRef.current) {
				const currentWidth = panelWrapperRef.current.offsetWidth
				setIsWide(currentWidth > 647)
			}
		})

		if (panelWrapperRef.current) {
			resizeObserver.observe(panelWrapperRef.current)
		}

		return () => {
			if (panelWrapperRef.current) {
				resizeObserver.unobserve(panelWrapperRef.current)
			}
		}
	}, [])

	const increasePanelWidth = () => {
		if (panelRef.current) {
			panelRef.current.resize(35)
			setIsExpand(true)
		}
	}

	const decreasePanelWidth = () => {
		if (panelRef.current) {
			panelRef.current.resize(20)
			setIsExpand(false)
		}
	}


	return (
		<div ref={panelWrapperRef} className={styles.root}>
			<div className={styles.top}>
				<CustomTooltip position='top' title='Collapse your library'>
					<div onClick={() => panelRef.current.resize(4)} className={styles.library}>
						<MdVideoLibrary className={styles.icon} />
						<p>Your library</p>
					</div>
				</CustomTooltip>
				<div className={styles.create}>
					<CustomTooltip position='top' title='Create playlist or folder'>
						<FiPlus onClick={handleClick} className={styles.icon} />
					</CustomTooltip>

					{isExpand ? (
						<CustomTooltip position='top' title='Show less'>
							<LuArrowLeft onClick={decreasePanelWidth} className={styles.icon} />
						</CustomTooltip>
					) : (
						<CustomTooltip
							position='top'
							title={isWide ? 'Show less' : 'Show more'}
						>
							{isWide ? (
								<LuArrowLeft onClick={decreasePanelWidth} className={styles.icon} />
							) : (
								<LuArrowRight onClick={increasePanelWidth} className={styles.icon} />
							)}
						</CustomTooltip>
					)}
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.empty}>
					<h4>Create your first playlist</h4>
					<p>It's easy, we'll help you</p>
					<button>Create playlist</button>
				</div>
			</div>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				sx={{
					'& .MuiMenu-paper': {
						marginTop: '10px',
						width: '220px',
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
					<div className={styles.item}>
						<PiMusicNotesPlusBold className={styles.icon} />
						<p>Create a new playlist</p>
					</div>
				</MenuItem>
				<MenuItem
					sx={{
						color: 'white',
						fontSize: '14px',
						padding: '10px 20px',
					}}
				>
					<div className={styles.item}>
						<FaRegFolder className={styles.icon} />
						<p>Create a new folder</p>
					</div>
				</MenuItem>
			</Menu>
		</div>
	)
}
