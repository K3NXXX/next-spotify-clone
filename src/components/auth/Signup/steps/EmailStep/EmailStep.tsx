import { ISignUp } from '@/@types/auth.types'
import { SignUpNextStepBtn } from '@/ui/SignUpNextStepBtn/SignUpNextStepBtn'
import { TextField } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import styles from './EmailStep.module.scss'
import appleIcon from '/public/signup/appleIcon.svg'
import facebookIcon from '/public/signup/facebookIcon.svg'
import googleIcon from '/public/signup/googleIcon.svg'

interface IEmailStepProps {
	register: UseFormRegister<ISignUp>
	errors: FieldErrors<ISignUp>
	handleChangeStep: () => void
}
export function EmailStep({
	register,
	errors,
	handleChangeStep,
}: IEmailStepProps) {
	return (
		<div className={styles.step0}>
			<h1 className={styles.title}>Sign up to begin listening</h1>
			<div className={styles.inputWrapper}>
				<label>Email address</label>
				<TextField
					className={styles.input}
					id='email'
					variant='outlined'
					placeholder='name@domain.com'
					{...register('email', {
						required: 'Email is required',
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
							message: 'Incorrect email format. Check and try again.',
						},
						maxLength: {
							value: 100,
							message: 'Email must contain max 100 letters',
						},
					})}
					error={!!errors.email}
					helperText={errors.email?.message}
				/>
			</div>
			<SignUpNextStepBtn handleChangeStep={handleChangeStep} />
			<div className={styles.orWrapper}>
				<div></div>
				<span>or</span>
				<div></div>
			</div>
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
					<Image
						className={styles.icon}
						src={facebookIcon}
						alt='facebook icon'
					/>
					<p>Continue with Facebook</p>
				</button>
				<button type='button'>
					<Image className={styles.icon} src={appleIcon} alt='apple icon' />
					<p>Continue with Apple</p>
				</button>
			</div>
			<p className={styles.logIn}>
				Already have an account? <Link href='#'>Log in</Link>
			</p>
		</div>
	)
}
