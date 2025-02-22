'use client'

import { ILogin } from '@/@types/auth.types'
import { PAGES } from '@/constants/pages.constants'
import { useLoginMutation } from '@/hooks/auth/useLoginMutation'
import { Loading } from '@/ui/Loading/Loading'
import { Logo } from '@/ui/Logo/Logo'
import { SocialButtons } from '@/ui/SocialButtons/SocialButtons'
import { TextField } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import styles from './Login.module.scss'

export function Login() {
	const { handleSubmit, register } = useForm<ILogin>({ mode: 'onChange' })

	const [showPassword, setShowPassword] = useState(false)
	const [loginError, setLoginError] = useState(false)
	const { mutate, status } = useLoginMutation(setLoginError)

	const onSubmit: SubmitHandler<ILogin> = data => {
		mutate(data)
	}
	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<Logo />
				<h1>Log in to Spotify</h1>
				<SocialButtons />
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<div className={styles.inputWrapper}>
						<label>Email address</label>

						<TextField
							className={styles.input}
							id='email'
							variant='outlined'
							placeholder='name@domain.com'
							{...register('email', {
								required: true,
							})}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label>Password</label>

						{showPassword ? (
							<BsEye
								onClick={() => setShowPassword(!showPassword)}
								className={styles.eyeIcon}
							/>
						) : (
							<BsEyeSlash
								onClick={() => setShowPassword(!showPassword)}
								className={styles.eyeIcon}
							/>
						)}
						<TextField
							className={styles.input}
							id='password'
							variant='outlined'
							{...register('password', {
								required: true,
							})}
							type={showPassword ? 'text' : 'password'}
						/>
						{loginError && (
							<p className={styles.loginError}>Incorrect email or password</p>
						)}
					</div>
					<button>Log in</button>
					{status === 'pending' && <Loading />}
				</form>
				<p className={styles.signup}>
					Do not have an account? <Link href={PAGES.SIGNUP}>Sign up</Link>
				</p>
			</div>
		</div>
	)
}
