import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Tag, Popover, Modal, Typography, message } from 'antd';
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';

import { deleteTicket, setEdition, showModal } from '../../store/ticketsSlice';
import styles from './Ticket.module.scss';

const Ticket = ({ taskId, index }) => {
  const { confirm } = Modal;
  const { Text } = Typography;
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tickets.tasks[taskId]);

  const editTicket = () => {
    dispatch(setEdition({ id: taskId, task }));
    dispatch(showModal(true));
  };

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
        dispatch(deleteTicket({ taskId }));
        successMessage();
      },
    });
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
    <Draggable draggableId={taskId} index={index}>
      {(provided) => (
        <div
          className={styles.Ticket}
          /* eslint-disable react/jsx-props-no-spreading */
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <span>
            <Tag
              style={{ borderRadius: '10px', color: '#1F1F49' }}
              color="#CAD1EB"
            >
              {task.type}
            </Tag>
          </span>

          <span className={styles.Image}>
            {task.image ? (
              <img src={task.image} alt="task.description" />
            ) : null}
          </span>
          <span className={styles.Id}>{taskId}</span>
          <p>{task.description}</p>
          <span className={styles.Actions}>
            <p className={styles.Assignee}>{task.assignee}</p>
            <Popover placement="rightBottom" content={popoverContent}>
              <Button
                aria-label="open"
                type="text"
                icon={<EllipsisOutlined />}
              />
            </Popover>
          </span>
        </div>
      )}
    </Draggable>
  );
};

Ticket.propTypes = {
  taskId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Ticket;
