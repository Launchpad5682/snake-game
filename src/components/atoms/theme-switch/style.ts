import { css } from '@emotion/react';
import { ColorsType } from '../../../contexts/theme-context';

export const button = (theme: ColorsType) => css`
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	border: 0;
	color: ${theme.text};
	background-color: ${theme.background};
	border: 2px solid ${theme.text};
	cursor: pointer;
`;
