import React, { useState } from 'react';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import InputMask from 'react-input-mask';
import history from '~services/history';

import api from '~/services/api';

import { Container, Header, StyledButton, Content } from './styles';

export default function RecipientsForm({ history: navigation }) {
  const { recip: recipient } = navigation.location.state || '';
  const [loading, setLoading] = useState(false);
  const [zipCode, setZipCode] = useState(recipient ? recipient.cep : '');

  async function handleSubmit(data) {
    const { name, street, number, complement, city, state } = data;

    let errors = 0;

    if (name === '') {
      toast.error('O nome precisa ser preenchido.');
      errors += 1;
    }

    if (street === '') {
      toast.error('A rua precisa ser preenchida.');
      errors += 1;
    }

    if (number === '') {
      toast.error('O número precisa ser preenchido');
      errors += 1;
    }

    if (city === '') {
      toast.error('A cidade precisa ser preeenchida');
      errors += 1;
    }

    if (state === '') {
      toast.error('O estado precisa ser preenchido');
      errors += 1;
    }

    if (zipCode === '') {
      toast.error('O CEP precisa ser preenchido');
      errors += 1;
    }

    if (errors >= 1) return;

    if (recipient) {
      try {
        setLoading(true);
        await api.put(`/recipients/${recipient.id}`, {
          name,
          street,
          number,
          complement,
          city,
          state,
          cep: zipCode,
        });

        setLoading(false);
        toast.success('O destinatário foi editado com sucesso');
      } catch (err) {
        setLoading(false);
        toast.error(err.response.data.error);
      }
    } else {
      try {
        setLoading(true);
        await api.post('/recipients', {
          name,
          street,
          number,
          complement,
          city,
          state,
          cep: zipCode,
        });

        setLoading(false);
        toast.success('O destinatário foi cadastrado com sucesso');
        history.push('/recipients');
      } catch (err) {
        setLoading(false);
        toast.error(err.response.data.error);
      }
    }
  }

  return (
    <Container>
      <Form initialData={recipient} onSubmit={handleSubmit}>
        <Header>
          <p>{recipient ? 'Edição' : 'Cadastro'} de destinatários</p>
          <div className="headerButtons">
            <StyledButton
              onClick={() => history.push('/recipients')}
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
          <div className="data">
            <span>Nome</span>
            <Input name="name" type="text" placeholder="Robert Englund" />
          </div>

          <div className="grid1">
            <div className="data">
              <span>Rua</span>
              <Input name="street" type="text" placeholder="Elm Street" />
            </div>

            <div className="data">
              <span>Número</span>
              <Input name="number" type="number" placeholder="1428" />
            </div>

            <div className="data">
              <span>Complemento</span>
              <Input name="complement" type="text" />
            </div>
          </div>

          <div className="grid2">
            <div className="data">
              <span>Cidade</span>
              <Input name="city" type="text" placeholder="Los Angeles" />
            </div>

            <div className="data">
              <span>Estado</span>
              <Input name="state" type="text" placeholder="CA" />
            </div>

            <div className="data">
              <span>CEP</span>
              <InputMask
                name="cep"
                placeholder="02331-140"
                mask="99999-999"
                maskChar=" "
                alwaysShowMask={false}
                value={zipCode}
                onChange={e => [setZipCode(e.target.value)]}
              />
            </div>
          </div>
        </Content>
      </Form>
    </Container>
  );
}

RecipientsForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
