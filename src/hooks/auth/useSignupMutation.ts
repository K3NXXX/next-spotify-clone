import { ISignUp } from '@/@types/auth.types'
import { PAGES } from '@/constants/pages.constants'
import { authService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

export const useSignupMutations = (
	setSignupStep: Dispatch<SetStateAction<number>>,
	setEmailError: Dispatch<SetStateAction<boolean>>
) => {
	const { push } = useRouter()

	const { mutate, status } = useMutation({
		mutationKey: ['signup'],
		mutationFn: (signupData: ISignUp) => authService.signup(signupData),
		onSuccess: data => {
			push(PAGES.EMAIL_VERIFY)
		},
		onError: (error: any) => {
			if (error.status === 409) {
				setSignupStep(0)
				setEmailError(true)
			}
		},
	})

	return { mutate, status }
}
