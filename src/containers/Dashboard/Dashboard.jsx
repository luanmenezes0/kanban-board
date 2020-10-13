import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { message } from 'antd';

import { getTickets, moveColumn } from '../../store/ticketsSlice';
import Column from '../Column/Column';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  const columnOrder = useSelector((state) => state.tickets.columnOrder);

  const [homeIndex, setHomeIndex] = useState(null);

  const onDragStart = (start) => {
    // finds index of the starting column
    const idx = columnOrder.indexOf(start.source.droppableId);
    // stores it in the state to be used to create conditional dropping
    setHomeIndex(idx);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    setHomeIndex(null);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch(
      moveColumn({
        taskId: draggableId,
        sourceColumn: source.droppableId,
        sourceIndex: source.index,
        destinationColumn: destination.droppableId,
        destinationIndex: destination.index,
      })
    );
    message.info('Ticket atualizado');
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <main className={styles.Container}>
        {columnOrder.map((columnId, destination) => {
          /* const canDrop = destination === homeIndex || homeIndex + 1; */ // conditional dropping rule
          const canDrop = destination >= homeIndex;
          return (
            <Column
              columnId={columnId}
              key={columnId}
              isDropDisabled={!canDrop}
            />
          );
        })}
      </main>
    </DragDropContext>
  );
};

export default Dashboard;
