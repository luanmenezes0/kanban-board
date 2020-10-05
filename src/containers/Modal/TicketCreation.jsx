import React, { useState } from 'react';
import { Button, Modal, Form, Select, Input, message } from 'antd';
import { useDispatch } from 'react-redux';

import { createTicket, getTickets } from '../../store/ticketsSlice';

const TicketCreation = (props) => {
  const { ticketTypes, ticketAssignees } = {
    ticketTypes: ['Bem', 'Predial', 'Procedimento'],
    ticketAssignees: [
      'Priscilla Alcantara',
      'Yudi Tamashiro',
      'Celso Portiolli',
      'Maísa Silva',
    ],
  };

  const [description, setDescription] = useState('');
  const [type, setType] = useState();
  const [assignee, setAssignee] = useState();

  const successMessage = () => {
    message.success('Ticket criado com sucesso');
  };

  const dispatch = useDispatch();
  const createTicketHandler = () => {
    const ticket = {
      id: new Date().getTime().toString().slice(8, 13),
      status: '1',
      description: description,
      ticketAssignee: assignee,
      ticketType: type,
    };
    dispatch(createTicket(ticket));
    dispatch(getTickets());
    show(false);
    successMessage();
  };

  const { open, show } = props;

  return (
    <>
      <Modal
        visible={open}
        title='Novo Ticket'
        onCancel={() => show(false)}
        style={{ top: '2rem' }}
        footer={[
          <Button key='back' shape='round' onClick={() => show(false)}>
            Cancelar
          </Button>,
          <Button
            onClick={createTicketHandler}
            key='submit'
            shape='round'
            type='primary'
          >
            Criar Ticket
          </Button>,
        ]}
      >
        <Form>
          <Form.Item labelCol={{ span: '24' }} required label='Descrição'>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item labelCol={{ span: '24' }} required label='Tipo'>
            <Select value={type} onChange={(value) => setType(value)}>
              {ticketTypes.map((t) => (
                <Select.Option key={t}>{t}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item labelCol={{ span: '24' }} required label='Responsável'>
            <Select value={assignee} onChange={(value) => setAssignee(value)}>
              {ticketAssignees.map((a) => (
                <Select.Option key={a}>{a}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TicketCreation;
