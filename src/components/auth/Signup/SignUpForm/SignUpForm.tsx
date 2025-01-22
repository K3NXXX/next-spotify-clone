'use client'
import { ISignUp } from '@/@types/auth.types'
import { LinearProgress } from '@mui/material'
import TextField from '@mui/material/TextField'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { GoCircle } from 'react-icons/go'
import { MdArrowBackIos, MdCheckCircle } from 'react-icons/md'
import styles from './SignUpForm.module.scss'
import appleIcon from '/public/signup/appleIcon.svg'
import facebookIcon from '/public/signup/facebookIcon.svg'
import googleIcon from '/public/signup/googleIcon.svg'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'

export function SignUpForm() {
	const {
		register,
		handleSubmit,
		trigger,
		watch,
		formState: { errors },
	} = useForm<ISignUp>({ mode: 'onChange' })

	const [signupStep, setSignupStep] = useState(0)
	const [showPassword, setShowPassword] = useState(false)
	const progress = (signupStep / 3) * 100

	const handleChangeStep = async () => {
		const isEmailValid = signupStep === 0 ? await trigger('email') : true
		const isPasswordValid = signupStep === 1 ? await trigger('password') : true
		const isConfirmPasswordValid =
			signupStep === 2 ? await trigger('confirmPassword') : true

		if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
			setSignupStep(prev => prev + 1)
		}
	}

	const {mutate} = useMutation({
		mutationKey: ['signup'],
		mutationFn: (signupData: ISignUp) => authService.signup(signupData),
		onSuccess: () => {
			
		}
	})

	const onSubmit: SubmitHandler<ISignUp> = signupData => {
		mutate(signupData)
	}
	return (
		<>
			<form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
				{signupStep === 0 && (
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
						<button
							onClick={handleChangeStep}
							type='button'
							className={styles.nextButton}
						>
							Next
						</button>
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
								<Image
									className={styles.icon}
									src={appleIcon}
									alt='apple icon'
								/>
								<p>Continue with Apple</p>
							</button>
						</div>
						<p className={styles.logIn}>
							Already have an account? <Link href='#'>Log in</Link>
						</p>
					</div>
				)}
				{signupStep === 1 && (
					<div className={styles.step1}>
						<LinearProgress
							className={styles.progress}
							variant='determinate'
							value={progress}
						/>
						<div className={styles.step1Wrapper}>
							<div className={styles.stepCount}>
								<MdArrowBackIos
									onClick={() => setSignupStep(prev => prev - 1)}
									className={styles.returnIcon}
								/>
								<div>
									<p>Step 1 of 3</p>
									<span>Create a password</span>
								</div>
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
									{...register('password', {
										required: 'Password is required',
										minLength: {
											value: 8,
											message: 'Password must be at least 8 characters',
										},
										validate: {
											hasCharacter: value =>
												/[a-zA-Zа-яА-Я]/.test(value) ||
												'Password must contain at least one letter',
											hasDigitOrSpecialChar: value =>
												/[0-9!@#$%^&*]/.test(value) ||
												'Password must contain at least one digit or special character (e.g., #$%^&)',
										},
									})}
									error={!!errors.password}
								/>
							</div>
							<p className={styles.mustContain}>Password must contain: </p>
							<div className={styles.passwordValid}>
								<div>
									{watch('password')?.match(/[a-zA-Zа-яА-Я]/) ? (
										<MdCheckCircle size={14} color='#1abc54' />
									) : (
										<GoCircle color='grey' size={14} />
									)}

									<p>1 character</p>
								</div>
								<div>
									{watch('password')?.match(/[0-9!@#$%^&*]/) ? (
										<MdCheckCircle size={14} color='#1abc54' />
									) : (
										<GoCircle size={14} color={'grey'} />
									)}

									<p>1 digit or special character (for example: #$%^&)</p>
								</div>
								<div>
									{watch('password')?.length >= 8 ? (
										<MdCheckCircle size={14} color='#1abc54' />
									) : (
										<GoCircle size={14} color={'grey'} />
									)}

									<p>8 characters</p>
								</div>
							</div>
							<button onClick={handleChangeStep} className={styles.nextButton}>
								Next
							</button>
						</div>
					</div>
				)}
				{signupStep === 2 && (
					<div className={styles.step2}>
						<LinearProgress
							className={styles.progress}
							variant='determinate'
							value={progress}
						/>
						<div className={styles.step2Wrapper}>
							<div className={styles.stepCount}>
								<MdArrowBackIos
									onClick={() => setSignupStep(prev => prev - 1)}
									className={styles.returnIcon}
								/>
								<div>
									<p>Step 2 of 3</p>
									<span>Confirm password</span>
								</div>
							</div>
							<div className={styles.inputWrapper}>
								<label>Check password</label>

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
									id='confirmPassword'
									variant='outlined'
									type={showPassword ? 'text' : 'password'}
									{...register('confirmPassword', {
										validate: value =>
											value === watch('password') || 'Passwords do not match',
									})}
									error={!!errors.confirmPassword}
									helperText={errors.confirmPassword?.message}
								/>
							</div>

							<button onClick={handleChangeStep} className={styles.nextButton}>
								Next
							</button>
						</div>
					</div>
				)}
				{signupStep === 3 && (
					<div className={styles.step3}>
						<LinearProgress
							className={styles.progress}
							variant='determinate'
							value={progress}
						/>
						<div className={styles.step3Wrapper}>
							<div className={styles.stepCount}>
								<MdArrowBackIos
									onClick={() => setSignupStep(prev => prev - 1)}
									className={styles.returnIcon}
								/>
								<div>
									<p>Step 3 of 3</p>
									<span>Tell about yourself</span>
								</div>
							</div>
							<div className={styles.inputWrapper}>
								<label>Your name</label>

								<TextField
									className={styles.input}
									id='password'
									variant='outlined'
									{...register('name', {
										required: 'Name is required',
										minLength: {
											value: 3,
											message: 'Name must contain at least 3 letters',
										},
										maxLength: {
											value: 50,
											message: 'Name must contain max 50 letters',
										},
										pattern: {
											value: /^[a-zA-Zа-яА-Я0-9]+$/,
											message: 'Name cannot contain special characters',
										},
									})}
									error={!!errors.name}
									helperText={errors.name?.message}
								/>
							</div>

							<button type='submit' className={styles.nextButton}>
								Create an account
							</button>
						</div>
					</div>
				)}
			</form>
		</>
	)
}
