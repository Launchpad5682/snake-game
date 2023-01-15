/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { ColorsType } from '../../../contexts/theme-context';
import * as classNames from './style';

export function GridElement({
	snakeCell,
	foodCell,
}: {
	snakeCell: boolean;
	foodCell: boolean;
}) {
	const theme = useTheme() as ColorsType;

	return <div css={classNames.gridElement(theme, snakeCell)} />;
}
