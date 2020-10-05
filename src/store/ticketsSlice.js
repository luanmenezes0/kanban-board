import { createSlice } from '@reduxjs/toolkit';

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    showModal: false,
  },
  reducers: {
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
    },

    moveTicket: (state, action) => {
      const tickets = JSON.parse(localStorage.getItem('tickets'));

      const { oldIndex, newIndex, ticketId } = action.payload;

      const ticket = tickets.filter((t) => t.id === ticketId);
      
      tickets.splice(oldIndex, 1);
      tickets.splice(newIndex, 0, ticket[0]);

      localStorage.setItem('tickets', JSON.stringify(tickets));
    },

    moveColumn: (state, action) => {
      const { ticketId, newStatus } = action.payload;

      const tickets = JSON.parse(localStorage.getItem('tickets'));
      const [ticket] = tickets.filter((t) => t.id === ticketId);
      ticket.id = newStatus;

      tickets.push(ticket);
      localStorage.setItem('tickets', JSON.stringify(tickets));
    },
    deleteTicket: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const {
  getTickets,
  createTicket,
  deleteTicket,
  moveTicket,
  moveColumn,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
