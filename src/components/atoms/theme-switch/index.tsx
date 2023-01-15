/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
/** @jsxImportSource @emotion/react */
import Icon from 'react-icons-kit';
import { ic_wb_sunny_outline } from 'react-icons-kit/md/ic_wb_sunny_outline';
import { ic_bedtime } from 'react-icons-kit/md/ic_bedtime';
import { useTheme } from '@emotion/react';
import { ColorsType, useThemeContext } from '../../../contexts/theme-context';

import * as classNames from './style';

export function ThemeSwitch() {
	const { theme, toggleTheme } = useThemeContext();
	const emotionTheme = useTheme();

	return (
		<button
			onClick={toggleTheme}
			type="button"
			css={classNames.button(emotionTheme as ColorsType)}
		>
			<Icon icon={theme === 'dark' ? ic_wb_sunny_outline : ic_bedtime} />
		</button>
	);
}
