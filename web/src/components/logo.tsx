import * as React from 'react';
import { Link } from 'react-router-dom';

export default (props: any) => {
  const imgSrc = '/img/netcetera-logo-inverse.png';

  return (
    <Link className="main-logo" to="/">
      <span className="main-title">Jargon</span>
      <br />
      <div className="secondary-title">
        <img src={imgSrc} alt="Logo" />
      </div>
      <br />
    </Link>
  );
};
