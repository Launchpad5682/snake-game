/* eslint-disable no-nested-ternary */
import { css } from '@emotion/react';
import { ColorsType } from '../../../contexts/theme-context';

export const gridElement = (
	theme: ColorsType,
	snakeCell: boolean,
	snakeHead: boolean,
) => css`
	display: flex;
	width: 100%;
	height: 100%;
	border-radius: 2px;
	font-size: 1.4rem;
	text-align: center;
	justify-content: center;
	align-items: center;
	background-color: ${snakeCell
		? snakeHead
			? theme.primary
			: theme.secondary
		: theme.background};
`;
