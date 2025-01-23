import styles from './SignUpNextStepBtn.module.scss'

interface ISignUpNextStepBtnProps {
	handleChangeStep: () => void
}
export function SignUpNextStepBtn({
	handleChangeStep,
}: ISignUpNextStepBtnProps) {
	return (
		<button
			onClick={handleChangeStep}
			type='button'
			className={styles.nextButton}
		>
			Next
		</button>
	)
}
