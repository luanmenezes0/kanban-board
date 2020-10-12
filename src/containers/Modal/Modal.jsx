import React, { useState, useEffect } from 'react';
import { Button, Modal as AntModal, Form, Select, Input, message } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import {
  createTicket,
  showModal,
  editTicket,
  resetEdition,
} from '../../store/ticketsSlice';

const { ticketTypes, ticketAssignees } = {
  ticketTypes: ['Bem', 'Predial', 'Procedimento'],
  ticketAssignees: [
    'Priscilla Alcantara',
    'Yudi Tamashiro',
    'Celso Portiolli',
    'Maísa Silva',
  ],
};

const Modal = () => {
  const dispatch = useDispatch();

  const modalIsVisible = useSelector((state) => state.tickets.modalIsVisible);
  const editMode = useSelector((state) => state.tickets.edition.editMode);
  const ticketToEdit = useSelector((state) => state.tickets.edition.ticket);

  const [form, setForm] = useState({
    description: '',
    type: '',
    assignee: '',
  });

  useEffect(() => {
    if (editMode) {
      setForm({
        description: ticketToEdit.description,
        type: ticketToEdit.type,
        assignee: ticketToEdit.assignee,
      });
    }
  }, [editMode, ticketToEdit]);

  const successMessage = () => {
    let action = '';
    if (editMode) {
      action = 'editado';
    } else {
      action = 'criado';
    }
    message.success(`Ticket ${action} com sucesso`);
  };

  const showModalHandler = (state) => {
    dispatch(showModal(state));
  };

  const cancelHandler = () => {
    showModalHandler(false);
    setForm({
      description: '',
      type: '',
      assignee: '',
      image: null,
    });
    dispatch(resetEdition());
  };

  const ticketFormHandler = () => {
    if (!editMode) {
      if (form.description !== '' && form.assignee !== '' && form.type !== '') {
        const ticket = {
          id: new Date().getTime().toString(),
          status: '1',
          ...form,
        };
        dispatch(createTicket(ticket));
      } else {
        return message.warning('preencha todos os campos necessários');
      }
    } else {
      dispatch(editTicket({ id: ticketToEdit.id, form }));
    }

    showModalHandler(false);
    dispatch(resetEdition());
    successMessage();
    setForm({
      description: '',
      type: '',
      assignee: '',
      image: null,
    });
  };

  const draggerProps = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    customRequest(info) {
      const { file } = info;
      const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      };
      getBase64(file).then((base64) => {
        setForm({ ...form, image: base64 });
      });
    },
  };

  const labelstyle = {
    color: 'rgba(0, 0, 0, 0.65)',
    fontWeight: '500',
  };

  return (
    <>
      <AntModal
        visible={modalIsVisible}
        title={editMode ? 'Editar Ticket' : 'Novo Ticket'}
        onCancel={cancelHandler}
        style={{ top: '2rem' }}
        footer={[
          <Button key="back" shape="round" onClick={cancelHandler}>
            Cancelar
          </Button>,
          <Button
            onClick={ticketFormHandler}
            key="submit"
            shape="round"
            type="primary"
          >
            {editMode ? 'Editar Ticket' : 'Criar Ticket'}
          </Button>,
        ]}
      >
        <Form data-testid="form">
          <Form.Item
            labelCol={{ span: '24' }}
            required
            label={<span style={labelstyle}>Descrição</span>}
          >
            <Input
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: '24' }}
            required
            label={<span style={labelstyle}>Tipo</span>}
          >
            <Select
              value={form.type}
              onChange={(value) => setForm({ ...form, type: value })}
            >
              {ticketTypes.map((t) => (
                <Select.Option key={t}>{t}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            labelCol={{ span: '24' }}
            required
            label={<span style={labelstyle}>Responsável</span>}
          >
            <Select
              value={form.assignee}
              onChange={(value) => setForm({ ...form, assignee: value })}
            >
              {ticketAssignees.map((a) => (
                <Select.Option key={a}>{a}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            labelCol={{ span: '24' }}
            label={<span style={labelstyle}>Imagem</span>}
          >
            <Dragger {...draggerProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Arraste uma imagem para adicionar ao ticket
              </p>
            </Dragger>
          </Form.Item>
        </Form>
      </AntModal>
    </>
  );
};

export default Modal;
