import { Slider } from '@mui/material'
import { Howl } from 'howler'
import { useEffect, useState } from 'react'
import { TbRepeat } from "react-icons/tb";
import { FaCirclePause } from 'react-icons/fa6'
import { IoIosSkipBackward, IoIosSkipForward } from 'react-icons/io'
import { PiShuffleAngularBold } from 'react-icons/pi'
import styles from './AudioPlayerDesktop.module.scss'
export function AudioPlayerDesktop() {
	const [audio, setAudio] = useState(null)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(0)

	useEffect(() => {
		const sound = new Howl({
			src: ['path/to/your/audio/file.mp3'],
			onplay: () => {
				setDuration(sound.duration())
				setInterval(() => {
					setCurrentTime(sound.seek())
				}, 1000)
			},
			onend: () => {
				setCurrentTime(0)
			},
		})
		setAudio(sound)

		return () => {
			sound.unload()
		}
	}, [])

	const handleSliderChange = (event, newValue) => {
		if (audio) {
			audio.seek(newValue)
		}
	}

	const formatTime = time => {
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor(time % 60)
		return `${minutes}:${('0' + seconds).slice(-2)}`
	}

	const currentTimeFormatted = formatTime(currentTime)
	const durationFormatted = formatTime(duration)
	return (
		<div className={styles.root}>
			<div className={styles.left}></div>
			<div className={styles.center}>
				<div className={styles.top}>
					<PiShuffleAngularBold className={styles.icon} />
					<IoIosSkipBackward className={styles.icon} />
					<FaCirclePause className={styles.iconPlay} />
					<IoIosSkipForward className={styles.icon} />
					<TbRepeat className={styles.icon} />
				</div>
				<div className={styles.bottom}>
					<p className={styles.time}>{currentTimeFormatted}</p>
					<Slider
						sx={{
							color: 'white',
							'& .MuiSlider-thumb': {
								display: 'none',
							},
							'&:hover .MuiSlider-thumb': {
								display: 'block',
								width: '10px',
								height: '10px'
							},
							'&:hover .MuiSlider-track': {
								backgroundColor: '#1abc54',
								border: '#1abc54',
							},
						}}
						aria-label='Volume'
						value={5}
					/>
					<p className={styles.time}>{durationFormatted}</p>
				</div>
			</div>
			<div className={styles.right}></div>
		</div>
	)
}
