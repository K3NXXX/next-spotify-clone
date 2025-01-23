import { FaSpotify } from 'react-icons/fa'
import { SignUpForm } from './SignUpForm/SignUpForm'
import styles from './Signup.module.scss'

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
