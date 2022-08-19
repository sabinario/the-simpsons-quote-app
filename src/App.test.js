import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

function mockFetch() {
	window.fetch = jest.fn();
	window.fetch.mockResolvedValueOnce({
		json: async () => [
			{
				quote: 'Inflammable means flammable? What a country!',
				character: 'Dr. Nick',
				image:
					'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FNickRiviera.png?1497567511084',
				characterDirection: 'Right',
				id: 'QaqMrWFV',
			},
		],
	});
}

describe('Render quote', () => {
	test('render a quote if request succeeds', async () => {
		mockFetch();
		render(<App />);

		const spinner = await screen.findByText(/loading/i);
		expect(spinner).toBeInTheDocument();

		const quoteEl = await screen.findAllByRole('article');
		expect(quoteEl).toHaveLength(1);
	});

	test('button more quotes adds one quote', async () => {
		window.fetch = jest.fn();
		window.fetch
			.mockResolvedValueOnce({
				json: async () => [
					{
						quote: 'Inflammable means flammable? What a country!',
						character: 'Dr. Nick',
						image:
							'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FNickRiviera.png?1497567511084',
						characterDirection: 'Right',
						id: 'QaqMrWFV',
					},
				],
			})
			.mockResolvedValueOnce({
				json: async () => [
					{
						quote: 'Inflammable means flammable? What a country!',
						character: 'Dr. Nick',
						image:
							'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FNickRiviera.png?1497567511084',
						characterDirection: 'Right',
						id: 'QaqMrWFfdV',
					},
				],
			});

		render(<App />);

		const moreQuotes = await screen.findByRole('button', {
			name: /more quotes/i,
		});
		userEvent.click(moreQuotes);

		const quoteEl = await screen.findAllByRole('article');
		expect(quoteEl).toHaveLength(2);
	});

	test('The results shows the name of the character', async () => {
		mockFetch();
		render(<App />);

		await waitFor(async () => {
			const characterHeading = await screen.findAllByRole('heading');
			expect(characterHeading[1]).toHaveTextContent(
				'Amazing quotes by... Dr. Nick'
			);
		});
	});
});
