import { createSlice } from '@reduxjs/toolkit';

import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../utils/local-storage-helper';

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tasks: {},
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'Abertos',
        taskIds: [],
      },
      'column-2': {
        id: 'column-2',
        title: 'Executados',
        taskIds: [],
      },
      'column-3': {
        id: 'column-3',
        title: 'Vistoriados',
        taskIds: [],
      },
      'column-4': {
        id: 'column-4',
        title: 'Arquivados',
        taskIds: [],
      },
    },
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
    modalIsVisible: false,
    edition: {
      editMode: false,
      ticket: null,
    },
  },
  reducers: {
    showModal: (state, action) => {
      state.modalIsVisible = action.payload;
    },

    setEdition: (state, action) => {
      const { id, task } = action.payload;
      state.edition.editMode = true;
      state.edition.ticket = { id, ...task };
    },

    resetEdition: (state) => {
      state.edition.editMode = false;
    },

    getTickets: (state) => {
      state.tasks = getFromLocalStorage('tasks');
      state.columns = getFromLocalStorage('columns') || state.columns;
    },

    createTicket: (state, action) => {
      const { form } = action.payload;

      const tasks = getFromLocalStorage('tasks') || {};
      const lastGenId = getFromLocalStorage('lastId') || 0;
      const newId = lastGenId + 1;
      tasks[newId.toString()] = { ...form };

      state.tasks = tasks;
      saveToLocalStorage('tasks', tasks);

      const columns = state.columns;
      columns['column-1'].taskIds.push(newId.toString());
      saveToLocalStorage('columns', columns);
      saveToLocalStorage('lastId', newId);
    },

    editTicket: (state, action) => {
      const { id, form } = action.payload;

      const tasks = getFromLocalStorage('tasks');
      tasks[id] = { ...tasks[id], ...form };

      saveToLocalStorage('tasks', tasks);
      state.tasks = tasks;
    },

    deleteTicket: (state, action) => {
      const { taskId } = action.payload;
      const tasks = getFromLocalStorage('tasks');
      delete tasks[taskId];

      saveToLocalStorage('tasks', tasks);
      state.tasks = tasks;

      const columns = getFromLocalStorage('columns');

      state.columnOrder.forEach((columnId) => {
        const column = columns[columnId];
        if (column.taskIds.includes(taskId)) {
          const index = column.taskIds.indexOf(taskId);
          column.taskIds.splice(index, 1);
        }
      });
      saveToLocalStorage('columns', columns);
      state.columns = columns;
    },

    moveColumn: (state, action) => {
      const {
        sourceColumn,
        sourceIndex,
        destinationColumn,
        destinationIndex,
        taskId,
      } = action.payload;

      const columns = getFromLocalStorage('columns');

      columns[sourceColumn].taskIds.splice(sourceIndex, 1);
      columns[destinationColumn].taskIds.splice(destinationIndex, 0, taskId);

      saveToLocalStorage('columns', columns);
      state.columns = columns;
    },
  },
});

export const {
  showModal,
  getTickets,
  createTicket,
  setEdition,
  resetEdition,
  editTicket,
  deleteTicket,
  moveTicket,
  moveColumn,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
