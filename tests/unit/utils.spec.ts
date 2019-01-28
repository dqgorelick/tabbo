'use strict';

import * as utils from '../../src/scripts/utils';


describe('queryOrThrow', (): void => {
	test('queries', (): void => {
		const prom = utils.queryOrThrow('#name');
		expect(typeof(prom)).toBe(Promise);
	});
});
