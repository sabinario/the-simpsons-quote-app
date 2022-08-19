import React from 'react';

import { render, screen } from '@testing-library/react';

import Quote from './Quote';

describe('Render quote', () => {
	test('render a quote if request succeeds', async () => {
		render(<Quote />);

		const characterImage = await screen.findByRole('img');
		expect(characterImage).toBeInTheDocument();
	});
});
