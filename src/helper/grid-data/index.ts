import {
	GridType,
	Position,
	SnakePosition,
} from '../../contexts/data-context/types';

export function generateGridData(rows: number, columns: number): GridType {
	const grid = [];

	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < rows; i++) {
		const row = [];
		// eslint-disable-next-line no-plusplus
		for (let j = 0; j < columns; j++) {
			row.push({
				x: j,
				y: i,
				snakeCell: false,
				foodCell: false,
				snakeHead: false,
			});
		}

		grid.push(row);
	}

	return grid;
}

export function updateGridWithSnakeAndFood(
	grid: GridType,
	snake: Array<SnakePosition>,
	food: Position | null,
) {
	const updatedGrid = [];
	const rows = grid.length;
	const columns = grid[0].length;

	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < rows; i++) {
		const row = [];
		// eslint-disable-next-line no-plusplus
		for (let j = 0; j < columns; j++) {
			const { x, y } = grid[i][j];
			row.push({
				x,
				y,
				snakeCell: false,
				foodCell: !!(food && food.x === x && food.y === y),
				snakeHead: false,
			});
		}

		updatedGrid.push(row);
	}
	const snakeLenght = snake.length;
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < snakeLenght; i++) {
		const { x, y } = snake[i];
		updatedGrid[y][x].snakeCell = true;
		if (i === 0) {
			updatedGrid[y][x].snakeHead = true;
		}
	}

	return updatedGrid;
}
