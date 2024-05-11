import { useParams, useLoaderData } from 'react-router-dom';
import { CopyOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Button } from '../../components/Button';
import { Grid } from '../../components/Grid';
import { Input } from '../../components/Input';
import { Toast } from '../../components/Toast';

import { useToast } from '../../components/Toast/hooks/useToast';
import { useCopyToClipboard } from './hooks/useCopyToClipboard';

import { Game } from './types/games';

import styles from './index.module.css';

export function Bingo() {
	const { roomId } = useParams();
	const game = useLoaderData() as Game;
	const { value, onCopy } = useCopyToClipboard(
		`${window.location.origin}/${roomId}`
	);
	const toastContext = useToast();

	const handleOnCopy = () => {
		onCopy();
		toastContext.show();
	};

	console.log(game);

	return (
		<div className={styles.container}>
			<div className={styles.mainContainer}>
				<Input
					value={roomId}
					containerClassName={styles.roomIdInput}
					addOnAfter={
						<CopyToClipboard text={value} onCopy={handleOnCopy}>
							<Button variant='secondary' className={styles.clipboardBtn}>
								<CopyOutlined />
							</Button>
						</CopyToClipboard>
					}
					disabled
				/>
				<h1>Pattern</h1>
				<Grid rows={5} columns={5} />
			</div>

			<Toast message='Copied to Clipboard!' variant='success' />
		</div>
	);
}
