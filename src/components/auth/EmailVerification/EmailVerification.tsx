'use client'

import { IEmailCode } from '@/@types/auth.types'
import { useEmailConfirmMutation } from '@/hooks/auth/useEmailConfirmMutation'
import { Loading } from '@/ui/Loading/Loading'
import { TextField } from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdOutlineEmail } from 'react-icons/md'
import styles from './EmailVerification.module.scss'

export function EmailVerification() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IEmailCode>({ mode: 'onChange' })

	const [codeError, setCodeError] = useState(false)
	const { mutate, status } = useEmailConfirmMutation(setCodeError)

	const onSubmit: SubmitHandler<IEmailCode> = data => {
		mutate(data)
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
			<div className={styles.wrapper}>
				<MdOutlineEmail size={40} />
				<h3>Email Verification</h3>
				<p>
					We have sent a code to your email. Please check your inbox to verify
					your registration. If you haven&apos;t received our email please check
					your spam folder.
				</p>
				<div className={styles.inputWrapper}>
					<label>Email code</label>

					<TextField
						className={styles.input}
						id='password'
						variant='outlined'
						placeholder='13gFfsd'
						{...register('token', {
							required: 'Code is required',
						})}
						error={!!errors.token}
						helperText={errors.token?.message}
					/>
					{codeError && <p className={styles.codeError}>Invalid code</p>}
				</div>
				<button className={styles.confirmBtn}>Confirm email</button>
				{status === 'pending' && <Loading />}
			</div>
		</form>
	)
}
