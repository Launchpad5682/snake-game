import {
	DirectionType,
	Position,
	Snake,
} from '../../contexts/data-context/types';

export function updateSnake(
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
		// eslint-disable-next-line no-plusplus
		updatedSnake[0].y--;
		updatedSnake[0].direction = 'up';
	} else if (direction === 'down') {
		// bottom boundary hit case
		if (updatedSnake[0].y + 1 > 19) {
			endGame();
			return snake;
		}
		// eslint-disable-next-line no-plusplus
		updatedSnake[0].y++;
		updatedSnake[0].direction = 'down';
	} else if (direction === 'left') {
		// left boundary hit case
		if (updatedSnake[0].x - 1 < 0) {
			endGame();
			return snake;
		}
		// eslint-disable-next-line no-plusplus
		updatedSnake[0].x--;
		updatedSnake[0].direction = 'left';
	} else if (direction === 'right') {
		// right boundary hit case
		if (updatedSnake[0].x + 1 > 29) {
			endGame();
			return snake;
		}
		// eslint-disable-next-line no-plusplus
		updatedSnake[0].x++;
		updatedSnake[0].direction = 'right';
	}

	// eslint-disable-next-line no-plusplus
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

	if (
		foodPosition &&
		updatedSnake[0].x === foodPosition.x &&
		updatedSnake[0].y === foodPosition.y
	) {
		eatFood();
		const {
			x,
			y,
			direction: snakeCellDirection,
		} = updatedSnake[snakeLenght - 1];
		if (snakeCellDirection === 'left') {
			updatedSnake.push({ x: x + 1, y, direction: snakeCellDirection });
		} else if (snakeCellDirection === 'right') {
			updatedSnake.push({ x: x - 1, y, direction: snakeCellDirection });
		} else if (snakeCellDirection === 'up') {
			updatedSnake.push({ x, y: y + 1, direction: snakeCellDirection });
		} else {
			updatedSnake.push({ x, y: y - 1, direction: snakeCellDirection });
		}
	}

	return updatedSnake;
}
