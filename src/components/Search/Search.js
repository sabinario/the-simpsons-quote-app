import React, { useRef } from 'react';

import fetchData from '../../utils/fetchData';

function Search({ onSearchQuotes, loading, setError }) {
	const inputRef = useRef();
	const selectRef = useRef();

	const onSubmit = (e) => {
		e.preventDefault();
		if (!inputRef.current?.value && !selectRef.current?.value) {
			return;
		}

		if (!inputRef.current?.value && selectRef.current?.value) {
			search('', selectRef.current?.value);
		}

		search(inputRef.current?.value, selectRef.current?.value);
	};

	const search = async (character, amount) => {
		try {
			loading(true);
			const results = await fetchData(
				`${process.env.REACT_APP_API_URL}/search?amount=${amount}&name=${character}`
			);
			console.log('results: ', results);
			onSearchQuotes(results);
		} catch (err) {
			loading(false);
			setError(err);
		}
		loading(false);
	};

	return (
		<>
			<h2>Search a character to get its famous quotes!</h2>
			<form
				onSubmit={onSubmit}
				style={{
					width: '30%',
					marginBottom: '32px',
					borderRadius: '8px',
					height: '56px',
					display: 'flex',
					justifyContent: 'space-between',
					padding: '12px 16px',
					backgroundColor: '#ebe719',
					boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1)',
				}}
			>
				<input
					ref={inputRef}
					type='text'
					name='character'
					id='character'
					placeholder='Search a character'
					style={{
						width: '70%',
						padding: '16px',
						borderRadius: '8px',
						border: 'none',
						boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1)',
					}}
				/>
				<select name='amount' id='amount' ref={selectRef} defaultValue=''>
					<option value=''>Select</option>
					<option value='5'>5</option>
					<option value='10'>10</option>
					<option value='15'>15</option>
					<option value='20'>20</option>
				</select>
				<button type='submit'>Search</button>
			</form>
		</>
	);
}

export default Search;
