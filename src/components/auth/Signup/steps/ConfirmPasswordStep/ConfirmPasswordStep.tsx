import { ISignUp } from '@/@types/auth.types'
import { SignUpNextStepBtn } from '@/ui/SignUpNextStepBtn/SignUpNextStepBtn'
import { LinearProgress, TextField } from '@mui/material'
import { useState } from 'react'
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { MdArrowBackIos } from 'react-icons/md'
import styles from './ConfirmPasswordStep.module.scss'

interface IConfirmPasswordStepProps {
	register: UseFormRegister<ISignUp>
	errors: FieldErrors<ISignUp>
	handleChangeStep: () => void
	progress: number
	setSignupStep: React.Dispatch<React.SetStateAction<number>>
	watch: UseFormWatch<ISignUp>
}
export function ConfirmPasswordStep({
	register,
	errors,
	handleChangeStep,
	progress,
	setSignupStep,
	watch,
}: IConfirmPasswordStepProps) {
	const [showPassword, setShowPassword] = useState(false)
	return (
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
						{...register('passwordConfirm', {
							validate: value =>
								value === watch('password') || 'Passwords do not match',
						})}
						error={!!errors.passwordConfirm}
						helperText={errors.passwordConfirm?.message}
					/>
				</div>

				<SignUpNextStepBtn handleChangeStep={handleChangeStep} />
			</div>
		</div>
	)
}
