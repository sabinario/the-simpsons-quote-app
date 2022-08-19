import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './assets/css/app.module.css';
import simpsonsLogo from './assets/images/thesimpsons.png';
import Quote from './components/Quote/Quote';
import LoadingSpinner from './components/ui/LoadingSpinner';

function App() {
	const bottomRef = useRef(null);
	const [quotes, setQuotes] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () => {
		let quote;
		await fetch(process.env.REACT_APP_API_URL)
			.then((response) => response.json())
			.then((data) => {
				quote = data;
			});
		return quote;
	};

	const fetchQuotes = useCallback(async () => {
		try {
			setIsLoading(true);
			const quote = await fetchData();
			setQuotes(quote);
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
			setIsLoading(false);
		} catch (err) {
			throw new Error(err);
		}
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

	return (
		<div className={styles.app}>
			<div>
				<img
					src={simpsonsLogo}
					alt='the simpsons logo'
					className={styles.logo}
				/>
			</div>
			{content}
			{isLoading && <LoadingSpinner />}
			<button className={styles.button} onClick={() => moreQuotes()}>
				More quotes
			</button>
			<div ref={bottomRef} />
		</div>
	);
}

export default App;
