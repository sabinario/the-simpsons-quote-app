import './App.css';

import { useEffect, useState } from 'react';

import logo from './logo.svg';

function App() {
	const [quotes, setQuotes] = useState([]);

	const fetchQuotes = async () => {
		try {
			const response = await fetch(process.env.REACT_APP_API_URL);
			const data = await response.json();
			setQuotes(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchQuotes();
	}, []);

	console.log(quotes);
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
