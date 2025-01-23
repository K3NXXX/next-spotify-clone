import { ISignUp } from '@/@types/auth.types'
import { PAGES } from '@/constants/pages.constants'
import { SignUpNextStepBtn } from '@/ui/SignUpNextStepBtn/SignUpNextStepBtn'
import { TextField } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import styles from './EmailStep.module.scss'
import { SocialButtons } from '@/ui/SocialButtons/SocialButtons'


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
			<SocialButtons/>
			<p className={styles.logIn}>
				Already have an account? <Link href={PAGES.LOGIN}>Log in</Link>
			</p>
		</div>
	)
}
