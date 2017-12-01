import * as React from 'react';
import STRINGS from '../../../localize-strings';

export default () => (
  <div id="faq-container">
    <h1>{STRINGS.faqFull}</h1>
    <h3>{STRINGS.faqJargon}</h3>
    <p>{STRINGS.faqJargonText}</p>

    <h3>{STRINGS.faqWhyImportant}</h3>
    <p>{STRINGS.faqWhyImportantText}</p>

    <h3>{STRINGS.faqLevelOfQuality}</h3>
    <p>{STRINGS.faqLevelOfQualityText}</p>

    <h3>{STRINGS.faqOurGoal}</h3>
    <p>{STRINGS.faqOurGoalText}</p>

    <h3>{STRINGS.faqSource}</h3>
    <p>{STRINGS.faqSourceText}</p>
    <p>
      {STRINGS.faqSourceText2}
      <a
        target="_blank"
        href="https://github.com/kjanko/deep-speech-mk-sentences">
        GitHub
      </a>.
    </p>
  </div>
);
