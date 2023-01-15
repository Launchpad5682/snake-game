/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import React from 'react';
import { ColorsType } from '../../contexts/theme-context';
import { ThemeSwitch } from '../atoms/theme-switch';
import * as classNames from './style';

function Header() {
	const theme = useTheme();

	// best score, current score
	return (
		<header css={classNames.header(theme as ColorsType)}>
			This is the Header
			<ThemeSwitch />
		</header>
	);
}

export { Header };
