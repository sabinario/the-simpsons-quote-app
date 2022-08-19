import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Search from './Search';

describe('Render search bar', () => {
	test('check if the input is in the document and typeable', async () => {
		render(<Search />);

		const searchInput = screen.getByRole('textbox');
		userEvent.clear(searchInput);
		userEvent.type(searchInput, 'homer');

		const selectAmount = screen.getByRole('combobox');
		userEvent.selectOptions(
			selectAmount,
			screen.getByRole('option', { name: '5' })
		);

		expect(searchInput).toHaveValue('homer');
	});
	test('check if the input is empty after sending form', async () => {
		render(<Search loading={jest.fn()} />);

		const searchInput = screen.getByRole('textbox');
		const selectAmount = screen.getByRole('combobox');
		const searchButton = screen.getByRole('button', { name: 'Search' });
		userEvent.clear(searchInput);
		userEvent.type(searchInput, 'homer');

		userEvent.selectOptions(
			selectAmount,
			screen.getByRole('option', { name: '5' })
		);
		expect(searchInput).toHaveValue('homer');

		userEvent.click(searchButton);

		expect(searchInput).toHaveValue('');
		expect(selectAmount).toHaveValue('');
	});
});
