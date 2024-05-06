import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { headers } from '../../constants/headers';
import supabase from '../../utils/supabase';

import styles from './index.module.css';

export function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleCreateRoom = async () => {
		try {
			setIsLoading(true);
			const {
				data: { data },
				error
			} = await supabase.functions.invoke('room', {
				headers,
				method: 'POST'
			});
			if (error) throw error;

			localStorage.setItem('roomId', data.room_id);
			localStorage.setItem('creatorId', data.creator_id);
			navigate(`/room/${data.room_id}`);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
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
						<Button
							variant='secondary'
							onClick={handleCreateRoom}
							isLoading={isLoading}
						>
							Create Room
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
}
