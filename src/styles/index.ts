import { css } from '@emotion/react';
import { ColorsType } from '../contexts/theme-context';

export const app = (theme: ColorsType) => css`
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: ${theme.background};
	color: ${theme.text};
	font-size: 3rem;
`;
