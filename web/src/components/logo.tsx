import * as React from 'react';
import { Link } from 'react-router-dom';
import STRINGS from '../../localize-strings';

export default (props: any) => {
  const imgSrc = '/img/netcetera-logo-inverse.png';
  const img = '/img/jargon_Netcetera_logo.svg';

  return (
    <Link className="main-logo" to="/">
      {/*<span className="main-title">{STRINGS.jargon}</span>*/}
      <br />
      <div className="secondary-title">
        <img src={img} alt="Logo" />
      </div>
      <br />
    </Link>
  );
};
