import { ISignUp } from '@/@types/auth.types'
import { SignUpNextStepBtn } from '@/ui/SignUpNextStepBtn/SignUpNextStepBtn'
import { LinearProgress, TextField } from '@mui/material'
import { useState } from 'react'
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { GoCircle } from 'react-icons/go'
import { MdArrowBackIos, MdCheckCircle } from 'react-icons/md'
import styles from './PasswordStep.module.scss'

interface IPasswordStepProps {
	register: UseFormRegister<ISignUp>
	errors: FieldErrors<ISignUp>
	handleChangeStep: () => void
	progress: number
	setSignupStep: React.Dispatch<React.SetStateAction<number>>
	watch: UseFormWatch<ISignUp>
}
export function PasswordStep({
	register,
	errors,
	handleChangeStep,
	progress,
	setSignupStep,
	watch,
}: IPasswordStepProps) {
	const [showPassword, setShowPassword] = useState(false)
	return (
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
				<SignUpNextStepBtn handleChangeStep={handleChangeStep} />
			</div>
		</div>
	)
}
