type MatrixPosition = {
	row: number;
	column: number;
};

type MatrixSize = {
	rows: number;
	columns: number;
};

export function selectMatrix2dTo1d(
	size: MatrixSize,
	position: MatrixPosition
): number {
	return position.row * size.columns + position.column;
}
