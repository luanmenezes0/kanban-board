import React from 'react';

import Dashboard from './containers/Dashboard/Dashboard';
import Header from './components/Header/Header';
import Modal from './containers/Modal/Modal';
import './App.less';

function App() {
  return (
    <>
      <Header />
      <Modal />
      <Dashboard />
    </>
  );
}

export default App;
