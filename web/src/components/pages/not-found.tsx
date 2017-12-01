import * as React from 'react';
import STRINGS from '../../../localize-strings';

export default () => (
  <div id="not-found-container">
    <h2>{STRINGS.notFound}</h2>
    <p>{STRINGS.notFoundExplain}</p>
  </div>
);
