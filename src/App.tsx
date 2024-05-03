import { Grid } from './components/Grid';

import styles from './App.module.css';

function App() {
	return (
		<div className={styles.mainContainer}>
			<Grid rows={5} columns={5} />
		</div>
	);
}

export default App;
