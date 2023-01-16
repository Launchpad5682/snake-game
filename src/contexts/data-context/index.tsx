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

function updateSnake(
	direction: DirectionType,
	snake: Snake,
	endGame: () => void,
): Snake {
	const updatedSnake: Snake = snake.map((value) => ({ ...value }));
	const snakeLenght = snake.length;

	if (direction === 'up') {
		// top boundary hit case
		if (updatedSnake[0].y - 1 < 0) {
			endGame();
			return snake;
		}
		updatedSnake[0].y--;
		updatedSnake[0].direction = 'up';
	} else if (direction === 'down') {
		// bottom boundary hit case
		if (updatedSnake[0].y + 1 > 19) {
			endGame();
			return snake;
		}
		updatedSnake[0].y++;
		updatedSnake[0].direction = 'down';
	} else if (direction === 'left') {
		// left boundary hit case
		if (updatedSnake[0].x - 1 < 0) {
			endGame();
			return snake;
		}
		updatedSnake[0].x--;
		updatedSnake[0].direction = 'left';
	} else if (direction === 'right') {
		// right boundary hit case
		if (updatedSnake[0].x + 1 > 29) {
			endGame();
			return snake;
		}
		updatedSnake[0].x++;
		updatedSnake[0].direction = 'right';
	}

	for (let i = 1; i < snakeLenght; i++) {
		// self-bite/intersection
		if (
			updatedSnake[i].x === updatedSnake[0].x &&
			updatedSnake[i].y === updatedSnake[0].y
		) {
			endGame();
			return snake;
		}
		updatedSnake[i].x = snake[i - 1].x;
		updatedSnake[i].y = snake[i - 1].y;
		updatedSnake[i].direction = snake[i - 1].direction;
	}

	return updatedSnake;
}
const initialSnakeValue: Snake = [
	{ x: 12, y: 10, direction: 'left' },
	{ x: 13, y: 10, direction: 'left' },
	{ x: 14, y: 10, direction: 'left' },
	{ x: 15, y: 10, direction: 'left' },
	{ x: 16, y: 10, direction: 'left' },
	{ x: 17, y: 10, direction: 'left' },
	{ x: 18, y: 10, direction: 'left' },
	{ x: 19, y: 10, direction: 'left' },
	{ x: 20, y: 10, direction: 'left' },
];

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
	const [snake, setSnake] = useState<Snake>(initialSnakeValue);
	const [grid, setGrid] = useState<GridType>(generateGridData(20, 30));

	const endGame = () => {
		setPauseGame(true);
		// setSnake(initialSnakeValue);
		setDirection('left');
	};

	useEffect(() => {
		if ((pauseGame && intervalID) || (!pauseGame && direction && intervalID)) {
			clearInterval(intervalID);
			setIntervalID(null);
		}

		if (!pauseGame && direction) {
			setIntervalID(
				setInterval(() => {
					setSnake((prev: Snake) => updateSnake(direction, prev, endGame));
				}, 300),
			);
		}

		return () => {
			if (intervalID) {
				clearInterval(intervalID);
				setIntervalID(null);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [direction, pauseGame]);

	useEffect(() => {
		setGrid((prevGrid) => updateGridWithSnake(prevGrid, snake));
	}, [snake]);

	const keyPressHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
		const { code } = event;

		if (code === 'ArrowLeft' && direction !== 'right') {
			setDirection('left');
		} else if (code === 'ArrowRight' && direction !== 'left') {
			setDirection('right');
		} else if (code === 'ArrowUp' && direction !== 'down') {
			setDirection('up');
		} else if (code === 'ArrowDown' && direction !== 'up') {
			setDirection('down');
		} else if (code === 'Space') {
			setPauseGame((prev) => !prev);
		}
	};

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	const value = { direction, grid, keyPressHandler } as DataContextInterface;

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
