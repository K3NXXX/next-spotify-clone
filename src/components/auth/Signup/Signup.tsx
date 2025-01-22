import { FaSpotify } from 'react-icons/fa'
import styles from './Signup.module.scss'
import { SignUpForm } from './SignUpForm/SignUpForm'

export function Signup() {
	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<FaSpotify className={styles.logo} />
				<SignUpForm />
			</div>
		</div>
	)
}
