import CustomTooltip from '@/ui/CustomTooltip/CustomTooltip'
import { useState, useEffect, useRef } from 'react'
import { FiPlus } from 'react-icons/fi'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
import { MdOutlineVideoLibrary } from 'react-icons/md'
import styles from './PlaylistsDesktop.module.scss'

interface IPlaylistsDesktopProps {
	panelRef: any
}

export function PlaylistsDesktop({ panelRef }: IPlaylistsDesktopProps) {
	const [isExpand, setIsExpand] = useState(false)
	const [isWide, setIsWide] = useState(false)
	const panelWrapperRef = useRef<HTMLDivElement>(null)

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

	const expandPanel = () => {
		if (panelRef.current) {
			panelRef.current.resize(35)
			setIsExpand(true)
		}
	}

	const collapsePanel = () => {
		if (panelRef.current) {
			panelRef.current.resize(20)
			setIsExpand(false)
		}
	}

	return (
		<div ref={panelWrapperRef} className={styles.root}>
			<div className={styles.top}>
				<CustomTooltip title='Collapse your library'>
					<div className={styles.library}>
						<MdOutlineVideoLibrary className={styles.icon} />
						<p>Your library</p>
					</div>
				</CustomTooltip>
				<div className={styles.create}>
					<CustomTooltip title='Create playlist or folder'>
						<FiPlus className={styles.icon} />
					</CustomTooltip>
					
					{isExpand ? (
						<CustomTooltip title="Show less">
							<LuArrowLeft onClick={collapsePanel} className={styles.icon} />
						</CustomTooltip>
					) : (
						<CustomTooltip title={isWide ? 'Show less' : 'Show more'}>
							{isWide ? (
								<LuArrowLeft onClick={collapsePanel} className={styles.icon} />
							) : (
								<LuArrowRight onClick={expandPanel} className={styles.icon} />
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
		</div>
	)
}
