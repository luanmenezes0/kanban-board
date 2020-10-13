import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';

import Dashboard from './containers/Dashboard/Dashboard';
import Header from './components/Header/Header';
import './App.less';

const Modal = lazy(() => import('./containers/Modal/Modal'));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<Spin />}>
        <Modal />
      </Suspense>
      <Dashboard />
    </>
  );
}

export default App;
