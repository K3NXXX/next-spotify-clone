import { PAGES } from '@/constants/pages.constants'
import { authService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useLogoutMutation = () => {
	const {push} = useRouter()
	const {mutate} = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			localStorage.removeItem('accessToken')
			push(PAGES.LOGIN)
		}
	})

	return {mutate}
}

