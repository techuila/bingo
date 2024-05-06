import { Button } from '../../components/Button';
import supabase from '../../utils/supabase';

import styles from './index.module.css';

export function Home() {
	const handleCreateRoom = async () => {
		try {
			const {
				data: { data },
				error
			} = await supabase.functions.invoke('room', {
				headers: {
					'x-api-key': import.meta.env.VITE_EDGE_FUNCTIONS_API_KEY,
					'Content-Type': 'application/json'
				},
				method: 'POST'
			});
			if (error) throw error;

			localStorage.setItem('roomId', data.room_id);
			localStorage.setItem('creatorId', data.creator_id);
		} catch (error) {
			console.error(error);
		}
	};

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
						<Button variant='secondary' onClick={handleCreateRoom}>
							Create Room
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
}
