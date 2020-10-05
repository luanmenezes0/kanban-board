import React from 'react';
import { Typography } from 'antd';
import { Droppable } from 'react-beautiful-dnd';

import styles from './Column.module.scss';
import Ticket from '../../components/Ticket/Ticket';

const Column = (props) => {
  const { title, color, tickets, statusId } = props;

  const { Title } = Typography;

  return (
    <section className={styles.Column}>
      <header style={{ backgroundColor: color }} className={styles.ColumnTitle}>
        <Title level={5}>{title}</Title>
      </header>
      <Droppable droppableId={statusId}>
        {(provided) => (
          <div
            className={styles.ColumnContent}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tickets
              ? tickets.map((ticket, index) => (
                  <Ticket key={ticket.id} index={index} ticket={ticket} />
                ))
              : null}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
};

export default Column;
