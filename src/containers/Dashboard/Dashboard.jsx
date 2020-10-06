import React, { useEffect, useState } from 'react';

import { getTickets, moveColumn, moveTicket } from '../../store/ticketsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Column from '../Column/Column';
import styles from './Dashboard.module.scss';
import { DragDropContext } from 'react-beautiful-dnd';
import { message } from 'antd';

const Dashboard = () => {
  const columns = [
    { title: 'Abertos', statusId: '1', color: 'rgba(245, 34, 45, 0.25)' },
    { title: 'Executados', statusId: '2', color: 'rgba(212, 102, 45, 0.25)' },
    { title: 'Vistoriados', statusId: '3', color: 'rgba(82, 196, 26, 0.25)' },
    { title: 'Arquivados', statusId: '4', color: 'rgba(193, 185, 185, 0.25)' },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  const tickets = useSelector((state) => state.tickets.tickets);

  const [homeIndex, setHomeIndex] = useState(null);

  const onDragStart = (start) => {
    const colIndex = columns.findIndex(
      (c) => c.statusId === start.source.droppableId
    );
    setHomeIndex(colIndex);
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

    const columnStart = source.droppableId;
    const columnfinish = destination.droppableId;

    if (columnStart === columnfinish) {
      return dispatch(
        moveTicket({
          oldIndex: source.index,
          newIndex: destination.index,
          ticketId: draggableId,
        })
      );
    }

    dispatch(
      moveColumn({
        ticketId: draggableId,
        newStatus: destination.droppableId,
      })
    );
    message.info('Ticket atualizado');
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <main className={styles.Container}>
        {columns.map((column, index) => {
          const ticketList = tickets
            ? tickets.filter((t) => t.status === column.statusId)
            : null;

          const isDropDisabled = homeIndex <= index;
          return (
            <Column
              title={column.title}
              statusId={column.statusId}
              color={column.color}
              tickets={ticketList}
              key={column.statusId}
              isDropDisabled={!isDropDisabled}
            />
          );
        })}
      </main>
    </DragDropContext>
  );
};

export default Dashboard;
