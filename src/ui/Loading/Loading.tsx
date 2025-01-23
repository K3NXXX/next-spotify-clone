import { CircularProgress } from '@mui/material'
import styles from "./Loading.module.scss"

export function Loading() {
	return <div className={styles.root}>
		<CircularProgress className={styles.loading} />
	</div>
}
