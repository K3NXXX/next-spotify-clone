import { ISignUp } from '@/@types/auth.types'
import { Loading } from '@/ui/Loading/Loading'
import { LinearProgress, TextField } from '@mui/material'
import { UseMutationResult } from '@tanstack/react-query'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { MdArrowBackIos } from 'react-icons/md'
import styles from './NameStep.module.scss'

interface INameStepProps {
	register: UseFormRegister<ISignUp>
	errors: FieldErrors<ISignUp>
	progress: number
	setSignupStep: React.Dispatch<React.SetStateAction<number>>
	status: UseMutationResult['status']
}
export function NameStep({
	register,
	errors,
	progress,
	status,
	setSignupStep,
}: INameStepProps) {
	return (
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
								message: 'Name must contain at least 3 characters',
							},
							maxLength: {
								value: 50,
								message: 'Name must contain max 50 characters',
							},
							pattern: {
								value: /^[a-zA-Zа-яА-Я0-9]+$/,
								message: 'Name cannot contain special characters',
							},
							validate: {
								hasThreeEnglishLetters: value =>
									(value.match(/[a-zA-Z]/g)?.length || 0) >= 3 ||
									'Name must contain at least 3 letters',
							},
						})}
						error={!!errors.name}
						helperText={errors.name?.message}
					/>
				</div>

				<button type='submit' className={styles.confirmButton}>
					Create account
				</button>
				{status === 'pending' && <Loading />}
				
			</div>
		</div>
	)
}
