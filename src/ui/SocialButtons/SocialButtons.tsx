import Image from 'next/image'
import styles from './SocialButtons.module.scss'
import appleIcon from '/public/signup/appleIcon.svg'
import facebookIcon from '/public/signup/facebookIcon.svg'
import googleIcon from '/public/signup/googleIcon.svg'

export function SocialButtons() {
	return (
		<div className={styles.socialButtons}>
			<button type='button'>
				<Image
					className={styles.googleIcon}
					src={googleIcon}
					alt='google icon'
				/>
				<p>Continue with Google</p>
			</button>
			<button type='button'>
				<Image className={styles.icon} src={facebookIcon} alt='facebook icon' />
				<p>Continue with Facebook</p>
			</button>
			<button type='button'>
				<Image className={styles.icon} src={appleIcon} alt='apple icon' />
				<p>Continue with Apple</p>
			</button>
		</div>
	)
}
