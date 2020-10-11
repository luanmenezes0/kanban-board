import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Tag, Popover, Modal, Typography, message } from 'antd';
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';

import { deleteTicket, setEdition, showModal } from '../../store/ticketsSlice';
import styles from './Ticket.module.scss';

const Ticket = (props) => {
  const { ticket, index } = props;
  const { confirm } = Modal;
  const { Text } = Typography;

  const dispatch = useDispatch();

  const successMessage = () => {
    message.success('Ticket excluído com sucesso');
  };

  const showDeleteConfirm = () => {
    confirm({
      title: 'Tem certeza que deseja excluir esse ticket?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk() {
        dispatch(deleteTicket({ ticketId: ticket.id }));
        successMessage();
      },
    });
  };

  const editTicket = () => {
    dispatch(setEdition(ticket));
    dispatch(showModal(true));
  };

  const popoverContent = (
    <div className={styles.Popover}>
      <Button onClick={editTicket} type="text">
        <Text strong>Editar</Text>
      </Button>
      <Button onClick={showDeleteConfirm} type="text">
        <Text strong>Excluir</Text>
      </Button>
    </div>
  );

  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided) => (
        <div
          className={styles.Ticket}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <span>
            <Tag
              style={{ borderRadius: '10px', color: '#1F1F49' }}
              color="#CAD1EB"
            >
              {ticket.type}
            </Tag>
          </span>

          <span className={styles.Image}>
            {ticket.image ? (
              <img src={ticket.image} alt="ticket.description" />
            ) : null}
          </span>
          <span className={styles.Id}>{ticket.id.slice(8, 12)}</span>
          <p>{ticket.description}</p>
          <span className={styles.Actions}>
            <p className={styles.Assignee}>{ticket.assignee}</p>
            <Popover placement="rightBottom" content={popoverContent}>
              <Button type="text" icon={<EllipsisOutlined />} />
            </Popover>
          </span>
        </div>
      )}
    </Draggable>
  );
};

export default Ticket;
