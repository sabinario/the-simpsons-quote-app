import React from 'react';

import styles from '../../assets/css/quote.module.css';
import BubbleText from '../ui/BubbleText';

function Quote({ quote, image, character, characterDirection }) {
	return (
		<article
			className={[
				styles['quote--container'],
				characterDirection?.toLowerCase() === 'right'
					? styles['direction--right']
					: styles['direction--left'],
			].join(' ')}
		>
			<div>
				<BubbleText text={quote} direction={characterDirection} />
			</div>
			<img src={image} alt={character} className={styles['character--image']} />
		</article>
	);
}

export default Quote;
