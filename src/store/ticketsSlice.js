import { createSlice } from '@reduxjs/toolkit';

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
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
      state.edition.editMode = true;
      state.edition.ticket = action.payload;
    },

    resetEdition: (state, action) => {
      state.edition.editMode = false;
    },

    getTickets: (state) => {
      state.tickets = JSON.parse(localStorage.getItem('tickets'));
    },

    createTicket: (state, action) => {
      let tickets = [];
      if (localStorage.hasOwnProperty('tickets')) {
        tickets = JSON.parse(localStorage.getItem('tickets'));
      }
      tickets.push(action.payload);
      localStorage.setItem('tickets', JSON.stringify(tickets));
      state.tickets = tickets;
    },

    editTicket: (state, action) => {
      const { id, form } = action.payload;

      const tickets = JSON.parse(localStorage.getItem('tickets'));
      let [ticket] = tickets.filter((t) => t.id === id);
      ticket = { ...ticket, ...form };

      const newTickets = tickets.filter((t) => t.id !== id);
      newTickets.push(ticket);

      localStorage.setItem('tickets', JSON.stringify(newTickets));
      state.tickets = newTickets;
    },

    deleteTicket: (state, action) => {
      const { ticketId } = action.payload;
      const tickets = JSON.parse(localStorage.getItem('tickets'));
      const newTickets = tickets.filter((t) => t.id !== ticketId);

      localStorage.setItem('tickets', JSON.stringify(newTickets));
      state.tickets = newTickets;
    },

    moveTicket: (state, action) => {
      const { oldIndex, newIndex, ticketId } = action.payload;

      const tickets = JSON.parse(localStorage.getItem('tickets'));
      const ticket = tickets.filter((t) => t.id === ticketId);

      tickets.splice(oldIndex, 1);
      tickets.splice(newIndex, 0, ticket[0]);

      localStorage.setItem('tickets', JSON.stringify(tickets));
      state.tickets = tickets;
    },

    moveColumn: (state, action) => {
      const { ticketId, newStatus } = action.payload;

      const tickets = JSON.parse(localStorage.getItem('tickets'));
      const ticket = tickets.find((t) => t.id === ticketId);
      ticket.status = newStatus;

      localStorage.setItem('tickets', JSON.stringify(tickets));
      state.tickets = tickets;
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
