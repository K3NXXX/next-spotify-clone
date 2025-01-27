import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { ILogin } from '@/@types/auth.types'
import { PAGES } from '@/constants/pages.constants'
import { authTokenService } from '@/services/auth-token.service'
import { authService } from '@/services/auth.service'
import { Dispatch, SetStateAction } from 'react'

export const useLoginMutation = (
	setLoginError: Dispatch<SetStateAction<boolean>>
) => {
	const { replace } = useRouter()

	const { mutate, status } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: ILogin) => authService.login(data),
		onSuccess: data => {
			window.history.replaceState(null, '', '/')
			replace(PAGES.HOME)
			authTokenService.saveAccessToken(data.accessToken)
			localStorage.setItem('userData', JSON.stringify(data.user))
		},
		onError: (error: any) => {
			console.log(error)
			if (error.status === 400) {
				setLoginError(true)
			}
		},
	})

	return { mutate, status }
}
