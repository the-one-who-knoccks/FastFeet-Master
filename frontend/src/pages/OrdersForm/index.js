import React, { useState } from 'react';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import history from '~services/history';

import api from '~/services/api';

import {
  Container,
  Header,
  StyledButton,
  Content,
  CustomAsyncSelect,
} from './styles';

export default function OrdersForm({ history: navigation }) {
  const { order } = navigation.location.state || '';
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState(order ? order.recipient : '');
  const [deliveryman, setDeliveryman] = useState(
    order ? order.deliveryman : ''
  );

  async function loadRecipients(q) {
    const res = await api.get(`recipients`, { params: { q } });

    return new Promise(resolve => {
      resolve(
        res.data.rows.map(st => {
          return {
            value: st.id,
            label: st.name,
            ...st,
          };
        })
      );
    });
  }

  async function loadDeliverymans(q) {
    const res = await api.get(`deliverymans`, { params: { q } });

    return new Promise(resolve => {
      resolve(
        res.data.rows.map(st => {
          return {
            value: st.id,
            label: st.name,
            ...st,
          };
        })
      );
    });
  }

  async function handleSubmit(o) {
    let errors = 0;

    if (recipient === null || recipient === '') {
      toast.error('Por favor, selecione um destinatário.');
      errors += 1;
    }

    if (deliveryman === null || deliveryman === '') {
      toast.error('Por favor, selecione um entregador.');
      errors += 1;
    }

    if (o.product === '') {
      toast.error('Por favor, preencha os dados do produto.');
      errors += 1;
    }

    if (errors >= 1) return;

    if (order) {
      try {
        setLoading(true);
        await api.put(`/orders/${order.id}`, {
          recipient_id: recipient.id,
          deliveryman_id: deliveryman.id,
          product: o.product,
        });

        setLoading(false);
        toast.success('A encomenda foi editada com sucesso');
      } catch (err) {
        setLoading(false);
        toast.error(err.response.data.error);
      }
    } else {
      try {
        setLoading(true);
        await api.post('/orders', {
          recipient_id: recipient.id,
          deliveryman_id: deliveryman.id,
          product: o.product,
        });

        setLoading(false);
        toast.success('A encomenda foi cadastrada com sucesso');
        history.push('/orders');
      } catch (err) {
        setLoading(false);
        toast.error(err.response.data.error);
      }
    }
  }

  return (
    <Container>
      <Form initialData={order} onSubmit={handleSubmit}>
        <Header>
          <p>{order ? 'Edição' : 'Cadastro'} de encomendas</p>
          <div className="headerButtons">
            <StyledButton onClick={() => history.push('/orders')} type="button">
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
          <div className="searchInputs">
            <div>
              <span>Destinatário</span>
              <CustomAsyncSelect
                isSearchable
                defaultOptions
                loadOptions={e => loadRecipients(e)}
                defaultValue={{
                  label: order ? order.recipient.name : '',
                  value: order ? order.recipient : '',
                }}
                onChange={e => setRecipient(e)}
                name="recipient"
              />
            </div>
            <div>
              <span>Entregador</span>
              <CustomAsyncSelect
                isSearchable
                defaultOptions
                loadOptions={e => loadDeliverymans(e)}
                defaultValue={{
                  label:
                    order && order.deliveryman ? order.deliveryman.name : '',
                  value: order && order.deliveryman ? order.deliveryman : '',
                }}
                onChange={e => setDeliveryman(e)}
                placeholder=""
                name="deliveryman"
              />
            </div>
          </div>
          <div className="product">
            <span>Nome do produto</span>
            <Input name="product" type="text" placeholder="Produto" />
          </div>
        </Content>
      </Form>
    </Container>
  );
}

OrdersForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
