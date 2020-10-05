import React from 'react';

import './App.less';
import Dashboard from './containers/Dashboard/Dashboard';
import Header from './components/Header/Header';

function App() {
  return (
    <>
      <Header />
      <Dashboard />
    </>
  );
}

export default App;
