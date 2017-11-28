import * as React from 'react';
import { Link } from 'react-router-dom';

const VALIDATED_HOURS = 200;
const GOAL_HOURS = 500;

export default () => (
  <div className="project-status">
    <div className="title-and-action">
      <h4>Целовкупен статус на проектот.</h4>
      <Link to="/record">Донирајте го вашиот глас</Link>
    </div>

    <div className="contents">
      <div className="language-progress">
        <b>МАКЕДОНСКИ</b>
        <div className="progress-bar">
          <div
            className="validated-hours"
            style={{ width: 100 * VALIDATED_HOURS / GOAL_HOURS + '%' }}
          />
        </div>
        <div className="numbers">
          <div>{VALIDATED_HOURS} валидирани часови текст до сега!</div>
          <div>Следна цел: {GOAL_HOURS}</div>
        </div>
      </div>

      <div>
        Дополнителни јазици наскоро!
        <div className="progress-bar" />
      </div>
    </div>
  </div>
);
