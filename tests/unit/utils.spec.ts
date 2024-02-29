'use strict';

import * as utils from '../../src/scripts/utils';


describe('queryOrThrow', (): void => {
	test('queries', async (): Promise<void> => {
		try {
			await utils.queryOrThrow('#name');
		} catch (err) {
			let typedErr = err as utils.ElementNotFoundError;
			expect(typedErr.message).toMatch('Query #name not found');
		}
	});
});
