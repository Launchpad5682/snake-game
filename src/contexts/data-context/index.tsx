/* eslint-disable no-plusplus */
import {
	createContext,
	ReactElement,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';

type DirectionType = 'up' | 'down' | 'left' | 'right';
type CellType = {
	x: number;
	y: number;
	snakeCell: boolean;
	foodCell: boolean;
};
type GridType = Array<Array<CellType>>;
type SnakePosition = {
	x: number;
	y: number;
	direction: DirectionType;
};

export interface DataContextInterface {
	direction: DirectionType;
	grid: GridType;
	keyPressHandler: () => any;
}

const DataContext = createContext<DataContextInterface | null>(null);
export const useDataContext = () => useContext(DataContext);

function generateGridData(rows: number, columns: number): GridType {
	const grid = [];

	for (let i = 0; i < rows; i++) {
		const row = [];
		for (let j = 0; j < columns; j++) {
			row.push({ x: j, y: i, snakeCell: false, foodCell: false });
		}

		grid.push(row);
	}

	return grid;
}

function updateGridWithSnake(grid: GridType, snake: Array<SnakePosition>) {
	const updatedGrid = [];
	const rows = grid.length;
	const columns = grid[0].length;

	for (let i = 0; i < rows; i++) {
		const row = [];
		for (let j = 0; j < columns; j++) {
			const { x, y, snakeCell, foodCell } = grid[i][j];
			row.push({
				x,
				y,
				snakeCell: false,
				foodCell,
			});
		}

		updatedGrid.push(row);
	}
	const snakeLenght = snake.length;
	for (let i = 0; i < snakeLenght; i++) {
		const { x, y } = snake[i];
		updatedGrid[x][y].snakeCell = true;
	}

	return updatedGrid;
}

function updateSnake() {}

export function DataProvider({
	children,
}: {
	children: ReactElement | ReactNode;
}) {
	const [direction, setDirection] = useState<DirectionType>('up');
	const [snake, setSnake] = useState<Array<SnakePosition>>([
		{ x: 12, y: 10, direction: 'right' },
		{ x: 13, y: 10, direction: 'right' },
		{ x: 14, y: 10, direction: 'right' },
		{ x: 15, y: 10, direction: 'right' },
		{ x: 16, y: 10, direction: 'right' },
	]);
	const [grid, setGrid] = useState<GridType>(generateGridData(20, 30));

	useEffect(() => {
		setGrid(() => updateGridWithSnake(grid, snake));
	}, []);

	useEffect(() => {
		const intervalID = setInterval(() => {}, 300);

		return () => clearInterval(intervalID);
	}, []);

	const keyPressHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
		console.log(event.code);
		const { code } = event;
		// ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Space
	};

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	const value = { direction, grid, keyPressHandler } as DataContextInterface;

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
