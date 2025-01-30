import { authService } from '@/services/auth.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import styles from './SocialButtons.module.scss'
import appleIcon from '/public/signup/appleIcon.svg'
import facebookIcon from '/public/signup/facebookIcon.svg'
import googleIcon from '/public/signup/googleIcon.svg'
import { useRouter } from 'next/navigation'

export function SocialButtons() {
	const {push} = useRouter()
	const {mutate :googleAuth} = useMutation({
		mutationKey: ['googleAuth'],
		mutationFn: () => authService.googleAuth()
	})

	const handleGoogleAuth = () => {
		googleAuth()
		push('auth/google')
	}

	return (
		<div className={styles.socialButtons}>
			<button onClick={handleGoogleAuth} type='button'>
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
