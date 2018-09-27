import React from 'react';
import fire from './fire';

import {Navbar} from './components';
import Routes from './routes';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
