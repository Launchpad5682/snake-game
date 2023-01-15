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
type Snake = Array<SnakePosition>;

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
			const { x, y, foodCell } = grid[i][j];
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
		updatedGrid[y][x].snakeCell = true;
	}

	return updatedGrid;
}

function updateSnake(direction: DirectionType, snake: Snake): Snake {
	const updatedSnake: Snake = [...snake];
	const snakeLenght = snake.length;

	if (direction === 'up') {
		updatedSnake[0].y--;
	} else if (direction === 'down') {
		updatedSnake[0].y++;
	} else if (direction === 'left') {
		updatedSnake[0].x--;
	} else if (direction === 'right') {
		updatedSnake[0].x++;
	}

	for (let i = 0; i < snakeLenght; i++) {
		// current box
		// next box
	}

	return updatedSnake;
}

export function DataProvider({
	children,
}: {
	children: ReactElement | ReactNode;
}) {
	const [pauseGame, setPauseGame] = useState<boolean>(true);
	const [direction, setDirection] = useState<DirectionType>('left');
	const [intervalID, setIntervalID] = useState<
		string | number | NodeJS.Timeout | null
	>(null);
	const [snake, setSnake] = useState<Snake>([
		{ x: 12, y: 10, direction: 'left' },
		{ x: 13, y: 10, direction: 'left' },
		{ x: 14, y: 10, direction: 'left' },
		{ x: 15, y: 10, direction: 'left' },
		{ x: 16, y: 10, direction: 'left' },
	]);
	const [grid, setGrid] = useState<GridType>(generateGridData(20, 30));

	useEffect(() => {
		setGrid(() => updateGridWithSnake(grid, snake));
	}, []);

	useEffect(() => {
		if ((pauseGame && intervalID) || (!pauseGame && direction && intervalID)) {
			clearInterval(intervalID);
			setIntervalID(null);
		}

		if (!pauseGame && direction) {
			setIntervalID(
				setInterval(() => {
					const updSnake = updateSnake(direction, snake);
					const updatedGrid = updateGridWithSnake(grid, snake);
					setSnake(updSnake);
					setGrid(updatedGrid);
				}, 300),
			);
		}

		return () => {
			if (intervalID) {
				clearInterval(intervalID);
				setIntervalID(null);
			}
		};
	}, [direction, pauseGame]);

	const keyPressHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
		const { code } = event;

		if (code === 'ArrowLeft') {
			setDirection('left');
		} else if (code === 'ArrowRight') {
			setDirection('right');
		} else if (code === 'ArrowUp') {
			setDirection('up');
		} else if (code === 'ArrowDown') {
			setDirection('down');
		} else if (code === 'Space') {
			setPauseGame((prev) => !prev);
		}
	};

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	const value = { direction, grid, keyPressHandler } as DataContextInterface;

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
