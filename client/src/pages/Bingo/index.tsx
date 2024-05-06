import { Grid } from '../../components/Grid';

import styles from './index.module.css';

export function Bingo() {
	return (
		<div className={styles.container}>
			<div className={styles.mainContainer}>
				<h1>Pattern</h1>
				<Grid rows={5} columns={5} />
			</div>
		</div>
	);
}
