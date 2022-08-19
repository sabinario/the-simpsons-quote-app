import React from 'react';

import styles from '../../assets/css/bubble-text.module.css';

function BubbleText({ text, direction }) {
	return (
		<div
			className={[
				styles.bubble,
				styles[`bubble-bottom-${direction?.toLowerCase()}`],
			].join(' ')}
		>
			{text}
		</div>
	);
}

export default BubbleText;
