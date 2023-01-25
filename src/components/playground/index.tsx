/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { useEffect } from 'react';
import { useDataContext } from '../../contexts/data-context';
import { DataContextInterface } from '../../contexts/data-context/types';
import { ColorsType } from '../../contexts/theme-context';
import { GridElement } from '../atoms/grid-element';
import * as classNames from './style';

function Playground() {
	const theme = useTheme() as ColorsType;
	const { grid, keyPressHandler, end, restartGame } =
		useDataContext() as DataContextInterface;

	useEffect(() => {
		document.addEventListener('keydown', keyPressHandler);
		return () => document.removeEventListener('keydown', keyPressHandler);
	}, [keyPressHandler]);

	return (
		<div css={classNames.playgroundContainer}>
			<div css={classNames.playground(theme)}>
				{grid.map((row, rowIdx) =>
					row.map(({ snakeCell, foodCell, snakeHead }, colIdx) => (
						<GridElement
							// eslint-disable-next-line react/no-array-index-key
							key={`${rowIdx}_${colIdx}`}
							snakeCell={snakeCell}
							foodCell={foodCell}
							snakeHead={snakeHead}
						/>
					)),
				)}
			</div>
			<div css={classNames.buttonContainer}>
				{end ? (
					<button
						type="button"
						onClick={restartGame}
						css={classNames.restartButton(theme)}
					>
						Reset Game
					</button>
				) : null}
			</div>
			<span css={{ fontSize: '2rem' }}>
				Use spacebar to play/pause game, and arrow keys to move snake.
			</span>
		</div>
	);
}

export { Playground };
