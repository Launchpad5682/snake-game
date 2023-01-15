/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { Header, Playground } from './components';
import { ColorsType } from './contexts/theme-context';
import * as classNames from './styles';

function App() {
	const theme = useTheme();

	return (
		<div css={classNames.app(theme as ColorsType)}>
			<Header />
			<Playground />
		</div>
	);
}

export default App;
