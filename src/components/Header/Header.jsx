import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { showModal } from '../../store/ticketsSlice';
import styles from './Header.module.scss';
import Logo from '../../assets/logo.png';
import Modal from '../../containers/Modal/Modal';
import { useDispatch } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className={styles.Header}>
      <div>
        <img src={Logo} alt='logo' />
      </div>
      <Button
        type='primary'
        size='large'
        shape='round'
        icon={<PlusOutlined />}
        onClick={() => dispatch(showModal(true))}
      >
        Novo ticket
      </Button>
      <Modal />
    </header>
  );
};

export default Header;
