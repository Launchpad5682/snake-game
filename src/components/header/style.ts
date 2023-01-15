import { css } from '@emotion/react';
import { ColorsType } from '../../contexts/theme-context';

export const header = (theme: ColorsType) => css`
	background-color: ${theme.background};
	font-size: 3rem;
	padding: 1rem 2rem;
	display: flex;
	justify-content: space-between;
`;
