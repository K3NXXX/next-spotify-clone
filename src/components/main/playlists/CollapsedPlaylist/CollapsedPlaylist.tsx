import CustomTooltip from '@/ui/CustomTooltip/CustomTooltip'
import { LuMusic } from 'react-icons/lu'
import { MdOutlineVideoLibrary } from 'react-icons/md'
import styles from './CollapsedPlaylist.module.scss'

interface ICollapsedPlaylistProps {
	panelRef: any
}

export function CollapsedPlaylist({ panelRef }: ICollapsedPlaylistProps) {
	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<CustomTooltip position='right' title='Expand your library'>
					<MdOutlineVideoLibrary
						onClick={() => panelRef.current.resize(20)}
						size={28}
						className={styles.icon}
					/>
				</CustomTooltip>
				<div className={styles.playlists}>
					<CustomTooltip position='right' title='Playlist'>
						<div className={styles.wrapper}>
							<LuMusic className={styles.icon} />
						</div>
					</CustomTooltip>
					<CustomTooltip position='right' title='Playlist'>
						<div className={styles.wrapper}>
							<LuMusic className={styles.icon} />
						</div>
					</CustomTooltip>
					<CustomTooltip position='right' title='Playlist'>
						<div className={styles.wrapper}>
							<LuMusic className={styles.icon} />
						</div>
					</CustomTooltip>
					<CustomTooltip position='right' title='Playlist'>
						<div className={styles.wrapper}>
							<LuMusic className={styles.icon} />
						</div>
					</CustomTooltip>
				</div>
			</div>
		</div>
	)
}
