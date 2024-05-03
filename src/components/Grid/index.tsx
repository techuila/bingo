import { Box } from '../Box';
import { useDragHover } from '../../hooks/useDragHover';

import { _arr } from '../../utils/array';
import styles from './index.module.css';

type GridProps = {
	rows: number;
	columns: number;
};

export function Grid(props: GridProps) {
	const { rows, columns } = props;
	const {
		isMouseDown,
		isHovered,
		handleMouseEnter,
		handleMouseDown,
		handleMouseLeave
	} = useDragHover();

	return (
		<div className={styles.gridContainer}>
			{_arr(rows).map((_, idx) => (
				<div key={idx} className={styles.row}>
					{_arr(columns).map((__, idx) => (
						<Box
							key={idx}
							isMouseDown={isMouseDown}
							isHovered={isHovered}
							onMouseDown={handleMouseDown}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						/>
					))}
				</div>
			))}
		</div>
	);
}
