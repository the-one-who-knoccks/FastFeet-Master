import React, { useState } from 'react';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import history from '~services/history';

import api from '~/services/api';

import AvatarInput from './AvatarInput';

import { Container, Header, StyledButton, Content } from './styles';

export default function DeliveryMansForm({ history: navigation }) {
  const { dman: deliveryman } = navigation.location.state || '';
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    let errors = 0;

    if (data.name === '') {
      toast.error('O campo Nome precisa ser preenchido.');
      errors += 1;
    }

    if (data.email === '') {
      toast.error('O campo Email precisa ser preenchido.');
      errors += 1;
    }

    if (errors >= 1) return;

    if (deliveryman) {
      try {
        setLoading(true);
        await api.put(`/deliverymans/${deliveryman.id}`, {
          name: data.name,
          email: data.email,
          avatar_id: data.avatar_id,
        });

        setLoading(false);
        toast.success('Os dados do entregador foram alterados com sucesso');
      } catch (err) {
        setLoading(false);
        toast.error(err.response.data.error);
      }
    } else {
      try {
        setLoading(true);
        await api.post('/deliverymans', {
          name: data.name,
          email: data.email,
          avatar_id: data.avatar_id,
        });

        setLoading(false);
        toast.success('Entregador cadastrado com sucesso');
        history.push('/deliverymans');
      } catch (err) {
        setLoading(false);
        toast.error(err.response.data.error);
      }
    }
  }

  return (
    <Container>
      <Form initialData={deliveryman} onSubmit={handleSubmit}>
        <Header>
          <p>{deliveryman ? 'Edição' : 'Cadastro'} de entregadores</p>
          <div className="headerButtons">
            <StyledButton
              onClick={() => history.push('/deliverymans')}
              type="button"
            >
              <MdKeyboardArrowLeft size={20} color="#fff" />
              VOLTAR
            </StyledButton>
            <StyledButton type="submit">
              <MdCheck size={20} color="#fff" />
              {loading ? 'SALVANDO...' : 'SALVAR'}
            </StyledButton>
          </div>
        </Header>
        <Content>
          <div className="avatar">
            <AvatarInput name="avatar_id" />
          </div>
          <div className="data">
            <span>Nome</span>
            <Input name="name" type="text" placeholder="Paulo Roberto" />
          </div>

          <div className="data">
            <span>E-mail</span>
            <Input
              name="email"
              type="email"
              placeholder="exemplo@fastfeet.com"
            />
          </div>
        </Content>
      </Form>
    </Container>
  );
}

DeliveryMansForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
