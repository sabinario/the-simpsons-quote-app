import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './assets/css/app.module.css';
import simpsonsLogo from './assets/images/thesimpsons.png';
import Quote from './components/Quote/Quote';
import Search from './components/Search/Search';
import LoadingSpinner from './components/ui/LoadingSpinner';
import fetchData from './utils/fetchData';

function App() {
	const bottomRef = useRef(null);
	const [quotes, setQuotes] = useState([]);
	const [character, setCharacter] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchQuotes = useCallback(async () => {
		try {
			setIsLoading(true);
			const quote = await fetchData();
			setQuotes(quote);
			setCharacter(quote[0].character);
			setIsLoading(false);
		} catch (err) {
			throw new Error(err);
		}
	}, []);

	const moreQuotes = async () => {
		try {
			setIsLoading(true);
			const quote = await fetchData();
			setQuotes((prev) => [...prev, ...quote]);
			setCharacter('The Simpsons cast');
			setIsLoading(false);
		} catch (err) {
			throw new Error(err);
		}
	};

	const clear = () => {
		fetchQuotes();
	};

	useEffect(() => {
		fetchQuotes();
	}, [fetchQuotes]);

	let content = quotes?.map((qt) => {
		const { quote, image, character, characterDirection } = qt;
		return (
			<Quote
				key={qt.id}
				quote={quote}
				image={image}
				character={character}
				characterDirection={characterDirection}
			/>
		);
	});

	const handleSearch = (result) => {
		if (!result) {
			setCharacter(false);
		}
		setQuotes(result);
	};

	return (
		<div className={styles.app}>
			<div>
				<img
					src={simpsonsLogo}
					alt='the simpsons logo'
					className={styles.logo}
				/>
			</div>
			<Search
				onClear={clear}
				setCharacter={setCharacter}
				onSearchQuotes={handleSearch}
				loading={setIsLoading}
				setError={setError}
			/>
			{!error && <h2>Amazing quotes by... {character}!</h2>}
			{!error && content}
			{error && <h2>{error}</h2>}
			{isLoading && <LoadingSpinner />}
			<div>
				<button className={styles.button} onClick={() => moreQuotes()}>
					More quotes
				</button>
				<button className={styles.button} onClick={() => fetchQuotes()}>
					Another quote!
				</button>
				<div ref={bottomRef} />
			</div>
		</div>
	);
}

export default App;
