/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import {
	DataContextInterface,
	useDataContext,
} from '../../contexts/data-context';
import { ColorsType } from '../../contexts/theme-context';
import { GridElement } from '../atoms/grid-element';
import * as classNames from './style';

function Playground() {
	const theme = useTheme() as ColorsType;
	const { grid, keyPressHandler } = useDataContext() as DataContextInterface;

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			css={classNames.playgroundContainer}
			// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
			tabIndex={-1}
			onKeyDown={keyPressHandler}
		>
			<div css={classNames.playground(theme)}>
				{grid.map((row, rowIdx) =>
					row.map(({ snakeCell, foodCell }, colIdx) => (
						<GridElement
							// eslint-disable-next-line react/no-array-index-key
							key={`${rowIdx}_${colIdx}`}
							snakeCell={snakeCell}
							foodCell={foodCell}
						/>
					)),
				)}
			</div>
		</div>
	);
}

export { Playground };
