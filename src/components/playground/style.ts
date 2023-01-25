import { css } from '@emotion/react';
import { ColorsType } from '../../contexts/theme-context';

export const playgroundContainer = css`
	display: flex;
	flex-direction: column;
	gap: 2rem;
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
	overflow: hidden;
	max-width: 800px;
	border-radius: 8px;
	background-color: ${theme.text};
	border: 2px solid ${theme.text};
`;

export const buttonContainer = css`
	height: 4rem;
`;

export const restartButton = (theme: ColorsType) => css`
	width: 100%;
	height: 100%;
	font-size: 2rem;
	padding: 0 1rem;
	background-color: ${theme.primary};
	color: ${theme.text};
	border: none;
	border-radius: 4px;
`;
