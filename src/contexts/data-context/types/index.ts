type DirectionType = 'up' | 'down' | 'left' | 'right';
type CellType = {
	x: number;
	y: number;
	snakeCell: boolean;
	snakeHead: boolean;
	foodCell: boolean;
};
type GridType = Array<Array<CellType>>;
type Position = { x: number; y: number };
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
	score: number;
	bestScore: number;
	restartGame: () => any;
	end: boolean;
}

export type {
	DirectionType,
	CellType,
	GridType,
	Position,
	SnakePosition,
	Snake,
};
