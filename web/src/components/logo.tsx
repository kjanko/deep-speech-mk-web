import * as React from 'react';
import { Link } from 'react-router-dom';
import STRINGS from '../../localize-strings';

export default (props: any) => {
  /*BASE_URL = "http://domain.mk" + STRINGS.getLanguage()
  PATH_URL = "http://domain.mk"*/
  const img = '/img/jargon.svg'; /*PATH_URL+*/

  return (
    <Link className="main-logo" to="/#">
      <div className="secondary-title">
        <img src={img} alt="Logo" />
      </div>
      <br />
    </Link>
  );
};
