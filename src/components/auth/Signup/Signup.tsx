import { FaSpotify } from 'react-icons/fa'
import { SignUpForm } from './SignUpForm/SignUpForm'
import styles from './Signup.module.scss'
import { Logo } from '@/ui/Logo/Logo'

export function Signup() {
	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<Logo/>
				<SignUpForm />
			</div>
		</div>
	)
}
