import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { showModal } from '../../store/ticketsSlice';
import Logo from '../../assets/logo.png';
import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(showModal(true));
  };

  return (
    <header className={styles.Header}>
      <div>
        <img src={Logo} alt="logo" />
      </div>
      <Button
        type="primary"
        size="large"
        shape="round"
        icon={<PlusOutlined />}
        onClick={handleClick}
      >
        Novo ticket
      </Button>
    </header>
  );
};

export default Header;
