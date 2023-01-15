import { css } from '@emotion/react';
import { ColorsType } from '../../contexts/theme-context';

export const playgroundContainer = css`
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	overflow-y: auto;
`;

export const playground = (theme: ColorsType) => css`
	display: grid;
	grid-template-columns: repeat(30, 1fr);
	grid-template-rows: repeat(20, 1fr);
	aspect-ratio: 1.5;
	width: 100%;
	max-width: 800px;
	border-radius: 8px;
	background-color: ${theme.background};
	border: 2px solid ${theme.text};
`;
