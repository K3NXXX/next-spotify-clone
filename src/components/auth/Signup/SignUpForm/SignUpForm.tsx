'use client'
import { ISignUp } from '@/@types/auth.types'
import { useSignupMutations } from '@/hooks/auth/useSignupMutation'
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
	const [emailError, setEmailError] = useState(false)
	const progress = (signupStep / 3) * 100
	const { mutate, status } = useSignupMutations(setSignupStep, setEmailError)

	const handleChangeStep = async () => {
		if (emailError) return
		const fields: Array<keyof ISignUp> = [
			'email',
			'password',
			'passwordConfirm',
		]
		const isValid = await trigger(fields[signupStep])

		if (isValid) {
			setSignupStep(prev => prev + 1)
		}
	}

	const handleEmailChange = () => {
		if (emailError) setEmailError(false)
	}

	const onSubmit: SubmitHandler<ISignUp> = signupData => {
		mutate(signupData)
	}
	return (
		<>
			<form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
				{signupStep === 0 && (
					<EmailStep
						emailError={emailError}
						handleEmailChange={handleEmailChange}
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
						register={register}
						errors={errors}
						progress={progress}
						setSignupStep={setSignupStep}
						status={status}
					/>
				)}
			</form>
		</>
	)
}
