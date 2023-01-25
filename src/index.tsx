import React from 'react';
import ReactDOM from 'react-dom/client';
import { css, Global } from '@emotion/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './contexts/theme-context';
import { DataProvider } from './contexts/data-context';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<>
		<Global
			styles={css`
				* {
					padding: 0;
					margin: 0;
					font-size: 62.5%;
				}
			`}
		/>
		<ThemeProvider>
			<DataProvider>
				<App />
			</DataProvider>
		</ThemeProvider>
	</>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
