import React from 'react';

import styles from '../../assets/css/quote.module.css';
import BubbleText from '../ui/BubbleText';

function Quote({ quote, image, character, characterDirection }) {
	let imageDirection = `character--imagedirection__${characterDirection?.toLowerCase()}`;

	return (
		<article
			className={[styles['quote--container'], styles[imageDirection]].join(' ')}
		>
			<div>
				<BubbleText text={quote} direction={characterDirection} />
			</div>
			<img
				src={image}
				alt={character}
				className={styles['quote--character__image']}
			/>
		</article>
	);
}

export default Quote;
