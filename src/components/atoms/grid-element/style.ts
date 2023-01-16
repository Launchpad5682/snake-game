import { css } from '@emotion/react';
import { ColorsType } from '../../../contexts/theme-context';

export const gridElement = (theme: ColorsType, snakeCell: boolean) => css`
	background-color: red;
	display: flex;
	width: 100%;
	height: 100%;
	border-radius: 8px;
	font-size: 2rem;
	background-color: ${snakeCell ? theme.text : theme.background};
`;
