import { Logo } from '@/ui/Logo/Logo'
import { SignUpForm } from './SignUpForm/SignUpForm'
import styles from './Signup.module.scss'

export function Signup() {
	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<Logo />
				<SignUpForm />
			</div>
		</div>
	)
}
