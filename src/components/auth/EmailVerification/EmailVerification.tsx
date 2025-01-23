'use client'
import { IEmailCode } from '@/@types/auth.types'
import { TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdOutlineEmail } from 'react-icons/md'
import styles from './EmailVerification.module.scss'

export function EmailVerification() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IEmailCode>({ mode: 'onChange' })

	const onSubmit: SubmitHandler<IEmailCode> = data => {
		console.log(data)
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
			<div className={styles.wrapper}>
				<MdOutlineEmail size={40} />
				<h3>Email Verification</h3>
				<p>
					We have sent a code to your email. Please check your inbox to verify
					your registration. If you haven&apos;t received our email please check your
					spam folder.
				</p>
				<div className={styles.inputWrapper}>
					<label>Email code</label>

					<TextField
						className={styles.input}
						id='password'
						variant='outlined'
						{...register('code', {
							required: 'Code is required',
						})}
						error={!!errors.code}
						helperText={errors.code?.message}
					/>
				</div>
				<button className={styles.confirmBtn}>Confirm email</button>
			</div>
		</form>
	)
}
