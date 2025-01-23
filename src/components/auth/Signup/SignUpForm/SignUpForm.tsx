'use client'
import { ISignUp } from '@/@types/auth.types'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ConfirmPasswordStep } from '../steps/ConfirmPasswordStep/ConfirmPasswordStep'
import { EmailStep } from '../steps/EmailStep/EmailStep'
import { NameStep } from '../steps/NameStep/NameStep'
import { PasswordStep } from '../steps/PasswordStep/PasswordStep'
import styles from './SignUpForm.module.scss'

export function SignUpForm() {
	const {
		register,
		handleSubmit,
		trigger,
		watch,
		formState: { errors },
	} = useForm<ISignUp>({ mode: 'onChange' })

	const [signupStep, setSignupStep] = useState(0)
	const progress = (signupStep / 3) * 100

	const handleChangeStep = async () => {
		const fields: Array<keyof ISignUp> = [
			'email',
			'password',
			'confirmPassword',
		]
		const isValid = await trigger(fields[signupStep])

		if (isValid) {
			setSignupStep(prev => prev + 1)
		}
	}

	// const {mutate} = useMutation({
	// 	mutationKey: ['signup'],
	// 	mutationFn: (signupData: ISignUp) => authService.signup(signupData),
	// 	onSuccess: () => {

	// 	}
	// })

	const onSubmit: SubmitHandler<ISignUp> = signupData => {
		// mutate(signupData)
		console.log(signupData)
	}
	return (
		<>
			<form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
				{signupStep === 0 && (
					<EmailStep
						handleChangeStep={handleChangeStep}
						register={register}
						errors={errors}
					/>
				)}
				{signupStep === 1 && (
					<PasswordStep
						handleChangeStep={handleChangeStep}
						register={register}
						errors={errors}
						progress={progress}
						setSignupStep={setSignupStep}
						watch={watch}
					/>
				)}
				{signupStep === 2 && (
					<ConfirmPasswordStep
						handleChangeStep={handleChangeStep}
						register={register}
						errors={errors}
						progress={progress}
						setSignupStep={setSignupStep}
						watch={watch}
					/>
				)}
				{signupStep === 3 && (
					<NameStep
						handleChangeStep={handleChangeStep}
						register={register}
						errors={errors}
						progress={progress}
						setSignupStep={setSignupStep}
						watch={watch}
					/>
				)}
			</form>
		</>
	)
}
