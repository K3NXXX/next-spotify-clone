'use client'

import { ILogin } from '@/@types/auth.types'
import { Logo } from '@/ui/Logo/Logo'
import { SocialButtons } from '@/ui/SocialButtons/SocialButtons'
import { TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './Login.module.scss'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { useState } from 'react'
import Link from 'next/link'
import { PAGES } from '@/constants/pages.constants'

export function Login() {
	const {
		register,
		handleSubmit,
		trigger,
		watch,
		formState: { errors },
	} = useForm<ILogin>({ mode: 'onChange' })

		const [showPassword, setShowPassword] = useState(false)

	const onSubmit: SubmitHandler<ILogin> = data => {
		console.log(data)
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
						type={showPassword ? 'text' : 'password'}
					
					/>
				</div>
				<button>Log in</button>
				</form>
				<p className={styles.signup}>
				Do not have an account? <Link href={PAGES.SIGNUP}>Sign up</Link>
			</p>
			</div>
		</div>
	)
}
