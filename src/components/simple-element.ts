'use strict';

import { property, html } from 'hybrids';

const increaseCount = (host) => {
	host.count += 1;
}

export const SimpleElement = {
	count: property(0),
	render: (host) => html`
    <button onclick="${increaseCount}">
      Count: ${host.count}
    </button>
  `,
};

define('simple-element', SimpleElement);
