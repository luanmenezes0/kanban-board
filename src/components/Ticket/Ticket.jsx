import React from 'react';
import { Button, Tag, Popover } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';

import styles from './Ticket.module.scss';

const Ticket = (props) => {
  const { ticket, index } = props;

  const popoverContent = (
    <div className={styles.Popover}>
      <span>Editar</span>
      <span>Exluir</span>
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
              color='#CAD1EB'
            >
              {ticket.ticketType}
            </Tag>
          </span>
          <span className={styles.TicketId}>{ticket.id}</span>
          <p>{ticket.description}</p>
          <span className={styles.Actions}>
            <p className={styles.TicketAssignee}>{ticket.ticketAssignee}</p>
            <Popover
              placement='topRight'
              content={popoverContent}
              trigger='click'
            >
              <Button type='text' icon={<EllipsisOutlined />}></Button>
            </Popover>
          </span>
        </div>
      )}
    </Draggable>
  );
};

export default Ticket;
