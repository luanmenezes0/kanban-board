import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styles from './Header.module.scss';
import Logo from '../../assets/logo.png';
import TicketCreation from '../../containers/Modal/TicketCreation';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
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
        onClick={() => setIsVisible(true)}
      >
        Novo ticket
      </Button>
      <TicketCreation open={isVisible} show={setIsVisible} />
    </header>
  );
};

export default Header;
