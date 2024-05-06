import { Grid } from '../../components/Grid';

import styles from './index.module.css';

export function Bingo() {
	return (
		<div className={styles.mainContainer}>
			<Grid rows={5} columns={5} />
		</div>
	);
}
