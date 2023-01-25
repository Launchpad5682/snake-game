/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { useDataContext } from '../../contexts/data-context';
import { DataContextInterface } from '../../contexts/data-context/types';
import { ColorsType } from '../../contexts/theme-context';
import { ThemeSwitch } from '../atoms/theme-switch';
import * as classNames from './style';

function Header() {
	const theme = useTheme();
	const { score, bestScore } = useDataContext() as DataContextInterface;

	return (
		<header css={classNames.header(theme as ColorsType)}>
			<span> Best Score: {bestScore}</span>
			<span>Current Score: {score}</span>
			<ThemeSwitch />
		</header>
	);
}

export { Header };
