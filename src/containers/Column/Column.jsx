import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import { Droppable } from 'react-beautiful-dnd';

import Ticket from '../../components/Ticket/Ticket';
import styles from './Column.module.scss';

const Column = ({ columnId, isDropDisabled }) => {
  const column = useSelector((state) => state.tickets.columns[columnId]);

  const { Title } = Typography;

  return (
    <section className={styles.Column}>
      <header className={styles[columnId]}>
        <Title level={5}>{column.title}</Title>
      </header>
      <Droppable droppableId={columnId} isDropDisabled={isDropDisabled}>
        {(provided, snapshot) => (
          <div
            className={styles.ColumnContent}
            ref={provided.innerRef}
            /* eslint-disable react/jsx-props-no-spreading */
            {...provided.droppableProps}
            style={{
              backgroundColor: snapshot.isDraggingOver ? '#f1f0f5' : 'white',
            }}
          >
            {column.taskIds
              ? column.taskIds.map((taskId, index) => (
                  <Ticket key={taskId} index={index} taskId={taskId} />
                ))
              : null}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
};

Column.propTypes = {
  columnId: PropTypes.string.isRequired,
  isDropDisabled: PropTypes.bool.isRequired,
};

export default Column;
