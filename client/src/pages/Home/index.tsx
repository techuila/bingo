import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cx from 'clsx';

import { Button } from '../../components/Button';

import styles from './index.module.css';
import { motion } from 'framer-motion';
import { useCreateRoom } from './hooks/useCreateRoom';

const inputButtonVariant = {
	hidden: {
		display: 'none',
		width: 0
	},
	visible: {
		display: 'inline-block',
		width: 100,
		transition: {
			duration: 0.25
		}
	}
};

export function Home() {
	const { createRoom, isLoading } = useCreateRoom();
	const [joinClicked, setJoinClicked] = useState(false);
	const [roomId, setRoomId] = useState('');
	const navigate = useNavigate();

	const handleCreateRoom = async () => {
		const { data } = await createRoom();

		if (data) {
			navigate(`room/${data.room_id}`);
		}
	};

	const handleJoinRoom = () => {
		if (!joinClicked) {
			setJoinClicked(true);
			return;
		}

		navigate(`room/${roomId}`);
	};

	const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
		setRoomId(event.target.value);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		event.key === 'Enter' && handleJoinRoom();
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
						<div className={styles.inputContainer}>
							<motion.input
								type='text'
								maxLength={5}
								variants={inputButtonVariant}
								animate={joinClicked ? 'visible' : 'hidden'}
								onChange={handleInput}
								onKeyDown={handleKeyDown}
							/>
							<Button
								variant='primary'
								onClick={handleJoinRoom}
								className={cx(joinClicked && styles.inputExpand)}
							>
								Join Room
							</Button>
						</div>
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
