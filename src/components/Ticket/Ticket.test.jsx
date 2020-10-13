import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import userEvent from '@testing-library/user-event';

import { render, screen } from '../../utils/test-utils';

import Ticket from './Ticket';

const initialState = {
  tickets: [],
  modalIsVisible: false,
  edition: {
    editMode: false,
    ticket: null,
  },
};

describe('<Ticket />', () => {
  test('renders ticket info', () => {
    render(
      <DragDropContext>
        <Droppable>
          {() => (
            <Ticket
              ticket={{
                assignee: 'Yudi Tamashiro',
                description: 'exemplo',
                id: '1602070238357',
                status: '1',
                type: 'Procedimento',
              }}
              index={0}
            />
          )}
        </Droppable>
      </DragDropContext>,
      { ...initialState }
    );

    const description = screen.getByText(/exemplo/i);
    const label = screen.getByText(/Procedimento/i);
    const button = screen.getByRole('button', { name: /open/i });

    expect(description).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });
});
