import { GridType, Position } from '../../contexts/data-context/types';
import { randomNumberGenerator } from '../random-number-generator';

export function placeFood(grid: GridType): Position {
	let x = randomNumberGenerator(29);
	let y = randomNumberGenerator(19);
	let placedFood = false;

	while (!placedFood) {
		if (grid[y][x].snakeCell) {
			x = randomNumberGenerator(29);
			y = randomNumberGenerator(19);
		} else {
			placedFood = true;
		}
	}

	return { x, y };
}
