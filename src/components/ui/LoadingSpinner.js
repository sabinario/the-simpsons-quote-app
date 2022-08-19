import React from 'react';

import styles from '../../assets/css/loading-spinner.module.css';

function LoadingSpinner() {
	return (
		<>
			<div data-testid='spinner' className={styles['lds-spinner']}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<h4>Loading</h4>
		</>
	);
}

export default LoadingSpinner;
