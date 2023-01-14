/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import './App.css';
import * as classNames from './style';

function App() {
	const [first, setFirst] = useState(false);

	useEffect(() => {
		console.log('on initial mount', first);
		setFirst(true);
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<p css={classNames.paraContainer}>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
