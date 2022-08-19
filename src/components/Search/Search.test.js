import React from 'react';

import { render } from '@testing-library/react';

import Search from './Search';

describe('Render search bar', () => {
	test('render a quote if request succeeds', async () => {
		render(<Search />);
	});
});
