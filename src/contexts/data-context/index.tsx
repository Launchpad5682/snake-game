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
import {
	generateGridData,
	placeFood,
	updateGridWithSnakeAndFood,
	updateSnake,
} from '../../helper/index';

// data
import { initialSnakeValue } from './data';

// types
import {
	DirectionType,
	GridType,
	Position,
	Snake,
	DataContextInterface,
} from './types/index';

const DataContext = createContext<DataContextInterface | null>(null);
export const useDataContext = () => useContext(DataContext);

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
	const [end, setEnd] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [bestScore, setBestScore] = useState(
		() =>
			JSON.parse(localStorage.getItem('nokia-snake-score') as string)
				?.bestScore || 0,
	);

	const endGame = () => {
		setEnd(true);
		setPauseGame(true);
		setDirection('left');
	};

	const restartGame = () => {
		setEnd(false);
		setDirection('left');
		setFoodPosition(null);
		setSnake(initialSnakeValue);
		setScore(0);
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

	useEffect(() => {
		if (score > bestScore && end) {
			setBestScore(score);
			localStorage.setItem(
				'nokia-snake-score',
				JSON.stringify({ bestScore: score }),
			);
		}
	}, [bestScore, end, score]);

	const keyPressHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (!end) {
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
		}
	};

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	const value = {
		direction,
		grid,
		keyPressHandler,
		score,
		bestScore,
		restartGame,
		end,
	} as DataContextInterface;

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
