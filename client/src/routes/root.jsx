import React from 'react';

import logo from '../media/logo.svg';
import '../css/Root.css';

function Root() {
  // eslint-disable-next-line
  const [data, setData] = React.useState(null);

  // TODO: Get data from /api / delete eslint-disable, above.

  return (
    <div className="Root">
      <header className="Root-header">
        <h1>Welcome to the Hello suite.</h1>
        <img src={logo} className="Root-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default Root;
