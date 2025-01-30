import CustomTooltip from '@/ui/CustomTooltip/CustomTooltip'
import { Slider } from '@mui/material'
import { Howl } from 'howler'
import { useEffect, useState } from 'react'
import { FaCirclePause } from 'react-icons/fa6'
import { IoIosSkipBackward, IoIosSkipForward } from 'react-icons/io'
import { LuVolume1, LuVolume2, LuVolumeX } from 'react-icons/lu'
import { PiShuffleAngularBold } from 'react-icons/pi'
import { TbRepeat } from 'react-icons/tb'
import styles from './AudioPlayerDesktop.module.scss'

export function AudioPlayerDesktop() {
	const [audio, setAudio] = useState<Howl | null>(null)
	const [currentTime, setCurrentTime] = useState(0)
	const [maxTime, setMaxTime] = useState(0)
	const [volume, setVolume] = useState(50)
	const [sliderValue, setSliderValue] = useState(0)

	const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
		const newVolume = newValue as number
		setVolume(newVolume)
		if (audio) {
			audio.volume(newVolume / 100)
		}
	}

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor(time % 60)
		return `${minutes}:${('0' + seconds).slice(-2)}`
	}

	const toggleVolume = () => {
		if (volume === 0) {
			setVolume(50)
		} else {
			setVolume(0)
		}
	}

	const getVolumeIcon = () => {
		if (volume === 0) return <LuVolumeX className={styles.volumeIcon} />
		if (volume <= 50) return <LuVolume1 className={styles.volumeIcon} />
		if (volume <= 100) return <LuVolume2 className={styles.volumeIcon} />
	}

	const currentTimeFormatted = formatTime(currentTime)
	const durationFormatted = formatTime(maxTime)

	useEffect(() => {
		const sound = new Howl({
			src: ['path/to/your/audio/file.mp3'],
			onplay: () => {
				setMaxTime(sound.duration())
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

	return (
		<div className={styles.root}>
			<div className={styles.left}></div>
			<div className={styles.center}>
				<div className={styles.top}>
					<CustomTooltip position='top' title='Shuffle'>
						<PiShuffleAngularBold className={styles.icon} />
					</CustomTooltip>
					<CustomTooltip position='top' title='Back'>
						<IoIosSkipBackward className={styles.icon} />
					</CustomTooltip>
					<CustomTooltip position='top' title='Play'>
						<FaCirclePause className={styles.iconPlay} />
					</CustomTooltip>
					<CustomTooltip position='top' title='Next'>
						<IoIosSkipForward className={styles.icon} />
					</CustomTooltip>
					<CustomTooltip position='top' title='Repeat'>
						<TbRepeat className={styles.icon} />
					</CustomTooltip>
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
								outline: 'none',
								boxShadow: 'none',
								height: '10px',
							},
							'&:hover .MuiSlider-track': {
								backgroundColor: '#1abc54',
								border: '#1abc54',
							},
						}}
						aria-label='Seek'
						value={sliderValue} // Використовуємо локальний стан
						onChange={(_, newValue) => setSliderValue(newValue as number)} // Оновлюємо значення слайдера
						min={0}
						max={100} // Тепер слайдер завжди має діапазон 0-100
					/>

					<p className={styles.time}>{durationFormatted}</p>
				</div>
			</div>
			<div className={styles.right}>
				<CustomTooltip position='top' title='Volume'>
					<div onClick={toggleVolume}>{getVolumeIcon()}</div>
				</CustomTooltip>
				<Slider
					sx={{
						width: '100px',
						color: 'white',
						'& .MuiSlider-thumb': {
							display: 'none',
						},
						'&:hover .MuiSlider-thumb': {
							display: 'block',
							outline: 'none',
							boxShadow: 'none',
							width: '10px',
							height: '10px',
						},
						'&:hover .MuiSlider-track': {
							backgroundColor: '#1abc54',
							border: '#1abc54',
						},
					}}
					aria-label='Volume'
					value={volume}
					onChange={handleVolumeChange}
					min={0}
					max={100}
				/>
			</div>
		</div>
	)
}
