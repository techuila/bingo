import { Button } from '../../components/Button';
import styles from './index.module.css';

export function Home() {
	return (
		<main>
			<div className={styles.container}>
				<div>
					<h1 className={styles.title}>Join or Create a Room</h1>
				</div>
				<div>
					<p>
						Play bingo with your friends or family. Create a room and share the
						link with your friends or join a room with a link.
					</p>

					<div className={styles.actions}>
						<Button variant='primary'>Join Room</Button>
						<Button variant='secondary'>Create Room</Button>
					</div>
				</div>
			</div>
		</main>
	);
}
