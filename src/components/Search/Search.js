import React, { useRef } from 'react';

import styles from '../../assets/css/search.module.css';
import fetchData from '../../utils/fetchData';

function Search({
	onSearchQuotes,
	loading,
	setError,
	setCharacter,
	onRefresh,
}) {
	const inputRef = useRef();
	const selectRef = useRef();

	const onSubmit = (e) => {
		e.preventDefault();
		if (!inputRef.current?.value && !selectRef.current?.value) {
			onRefresh();
			return;
		}

		search(inputRef.current?.value, selectRef.current?.value);
		inputRef.current.value = selectRef.current.value = '';
	};

	const search = async (character, amount) => {
		try {
			loading(true);
			const results = await fetchData(
				`${process.env.REACT_APP_API_URL}/search?amount=${amount}&name=${character}`
			);
			onSearchQuotes(results);
			if (character) {
				setCharacter(results[0].character);
			} else {
				setCharacter('The Simpsons cast');
			}
		} catch (err) {
			loading(false);
			setError(err);
		}
		loading(false);
	};

	return (
		<>
			<h2>Search a character to get its famous quotes!</h2>
			<form onSubmit={onSubmit} className={styles.form}>
				<input
					ref={inputRef}
					type='text'
					name='character'
					id='character'
					placeholder='Search a character'
					className={styles['form--input']}
				/>
				<select
					name='amount'
					id='amount'
					ref={selectRef}
					defaultValue=''
					className={styles['input--select']}
				>
					<option value=''>Select</option>
					<option value='5'>5</option>
					<option value='10'>10</option>
					<option value='15'>15</option>
					<option value='20'>20</option>
				</select>
				<button type='submit' className={styles['input--button']}>
					Search
				</button>
				<button
					type=''
					onClick={() => onRefresh()}
					className={styles['input--button']}
				>
					Clear
				</button>
			</form>
		</>
	);
}

export default Search;
