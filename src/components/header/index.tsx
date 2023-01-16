/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import React from 'react';
import { useDataContext } from '../../contexts/data-context';
import { DataContextInterface } from '../../contexts/data-context/types';
import { ColorsType } from '../../contexts/theme-context';
import { ThemeSwitch } from '../atoms/theme-switch';
import * as classNames from './style';

function Header() {
	const theme = useTheme();
	const { score } = useDataContext() as DataContextInterface;
	// best score, current score
	return (
		<header css={classNames.header(theme as ColorsType)}>
			<span>Current Score: {score}</span>
			<span> Best Score: 0</span>
			<ThemeSwitch />
		</header>
	);
}

export { Header };
