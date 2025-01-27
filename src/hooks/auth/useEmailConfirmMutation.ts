import { IEmailCode } from '@/@types/auth.types'
import { PAGES } from '@/constants/pages.constants'
import { authTokenService } from '@/services/auth-token.service'
import { authService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

export const useEmailConfirmMutation = (
	setCodeError: Dispatch<SetStateAction<boolean>>
) => {
	const { replace } = useRouter()

	const { mutate, status } = useMutation({
		mutationKey: ['emailConfirm'],
		mutationFn: (data: IEmailCode) => authService.emailVerification(data),
		onSuccess: data => {
			window.history.replaceState(null, '', '/')
			replace(PAGES.HOME)
			authTokenService.saveAccessToken(data.accessToken)
			localStorage.setItem('userData', JSON.stringify(data.user))
		},
		onError: (error: any) => {
			if (error.status === 404) setCodeError(true)
		},
	})
	return { mutate, status }
}
