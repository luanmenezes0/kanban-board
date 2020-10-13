import React from 'react';
import { render, screen } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';

import Header from './Header';

const initialState = {
  tickets: [],
  modalIsVisible: false,
  edition: {
    editMode: false,
    ticket: null,
  },
};

describe('<Header />', () => {
  beforeEach(() => {
    render(<Header />, { ...initialState });
  });
  it('renders header component', () => {
    const logo = screen.getByRole('img', { name: /logo/i });
    const button = screen.getByRole('button', { name: /plus novo ticket/i });
    const modal = screen.queryByTestId('form');
    expect(modal).toBeNull();
    expect(button).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });
});
