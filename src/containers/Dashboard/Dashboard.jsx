import React, { useEffect } from 'react';

import { getTickets, moveColumn, moveTicket } from '../../store/ticketsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Column from '../Column/Column';
import styles from './Dashboard.module.scss';
import { DragDropContext } from 'react-beautiful-dnd';

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

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

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
      dispatch(
        moveTicket({
          oldIndex: source.index,
          newIndex: destination.index,
          ticketId: draggableId,
        })
      );
      dispatch(getTickets());
    }

    /* dispatch(
      moveColumn({
        ticketId: draggableId,
        newStatus: destination.droppableId,
      })
    );
    dispatch(getTickets()); */
    console.log(result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className={styles.Container}>
        {columns.map((column) => {
          const ticketList = tickets
            ? tickets.filter((t) => t.status === column.statusId)
            : null;
          return (
            <Column
              title={column.title}
              statusId={column.statusId}
              color={column.color}
              tickets={ticketList}
              key={column.statusId}
            />
          );
        })}
      </main>
    </DragDropContext>
  );
};

export default Dashboard;
