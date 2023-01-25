/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { ColorsType } from '../../../contexts/theme-context';
import * as classNames from './style';

export function GridElement({
	snakeCell,
	foodCell,
	snakeHead,
}: {
	snakeCell: boolean;
	foodCell: boolean;
	snakeHead: boolean;
}) {
	const theme = useTheme() as ColorsType;

	return (
		<div css={classNames.gridElement(theme, snakeCell, snakeHead)}>
			{foodCell ? '🍔' : ''}
		</div>
	);
}
