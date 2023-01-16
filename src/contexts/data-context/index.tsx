/* eslint-disable no-plusplus */
import {
	createContext,
	ReactElement,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
// helpers
import { placeFood } from '../../helper/index';

// data
import { initialSnakeValue } from './data';

// types
import {
	DirectionType,
	GridType,
	Position,
	SnakePosition,
	Snake,
	DataContextInterface,
} from './types/index';

const DataContext = createContext<DataContextInterface | null>(null);
export const useDataContext = () => useContext(DataContext);

function generateGridData(rows: number, columns: number): GridType {
	const grid = [];

	for (let i = 0; i < rows; i++) {
		const row = [];
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

function updateGridWithSnakeAndFood(
	grid: GridType,
	snake: Array<SnakePosition>,
	food: Position | null,
) {
	const updatedGrid = [];
	const rows = grid.length;
	const columns = grid[0].length;

	for (let i = 0; i < rows; i++) {
		const row = [];
		for (let j = 0; j < columns; j++) {
			const { x, y, snakeHead } = grid[i][j];
			row.push({
				x,
				y,
				snakeCell: false,
				foodCell: !!(food && food.x === x && food.y === y),
				snakeHead,
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
	eatFood: () => void,
	foodPosition: Position | null,
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

	if (
		foodPosition &&
		updatedSnake[0].x === foodPosition.x &&
		updatedSnake[0].y === foodPosition.y
	) {
		eatFood();
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

export function DataProvider({
	children,
}: {
	children: ReactElement | ReactNode;
}) {
	const [pauseGame, setPauseGame] = useState<boolean>(true);
	const [direction, setDirection] = useState<DirectionType>('left');
	const [foodPosition, setFoodPosition] = useState<Position | null>(null);
	const [intervalID, setIntervalID] = useState<
		string | number | NodeJS.Timeout | null
	>(null);
	const [foodTimeID, setFoodTimerID] = useState<
		string | number | NodeJS.Timeout | null
	>(null);
	const [snake, setSnake] = useState<Snake>(initialSnakeValue);
	const [grid, setGrid] = useState<GridType>(generateGridData(20, 30));
	const [score, setScore] = useState<number>(0);

	const endGame = () => {
		setPauseGame(true);
		setSnake(initialSnakeValue);
		setDirection('left');
	};

	const eatFood = () => {
		setScore((prev) => prev + 1);
		setFoodPosition(null);
	};

	useEffect(() => {
		if ((pauseGame && intervalID) || (!pauseGame && direction && intervalID)) {
			clearInterval(intervalID);
			setIntervalID(null);
		}

		if (!pauseGame && direction) {
			setIntervalID(
				setInterval(() => {
					setSnake((prev: Snake) =>
						updateSnake(direction, prev, endGame, eatFood, foodPosition),
					);
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
		setGrid((prevGrid) =>
			updateGridWithSnakeAndFood(prevGrid, snake, foodPosition),
		);
	}, [snake, foodPosition]);

	// food placement and updates
	useEffect(() => {
		// update food after 50 seconds of not eating food
		if (foodPosition && !foodTimeID) {
			setFoodTimerID(
				setTimeout(() => setFoodPosition(() => placeFood(grid)), 50000),
			);
		}

		// no food available, place food
		if (!foodPosition) {
			setFoodPosition(() => placeFood(grid));
			setFoodTimerID(null);
		}

		return () => {
			if (foodTimeID) {
				clearTimeout(foodTimeID);
				setFoodTimerID(null);
			}
		};
	}, [foodPosition, foodTimeID, grid]);

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
	const value = {
		direction,
		grid,
		keyPressHandler,
		score,
	} as DataContextInterface;

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
