import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { zonedTimeToUtc } from 'date-fns-tz';
import { toast } from 'react-toastify';
import { Input } from '@rocketseat/unform';
import {
  MdAdd,
  MdSearch,
  MdVisibility,
  MdEdit,
  MdDeleteForever,
  MdRefresh,
} from 'react-icons/md';

import api from '~/services/api';

import history from '~/services/history';

import {
  Container,
  StyledLink,
  Button,
  StatusContent,
  ActionButton,
  ContextMenu,
  ModalBox,
  ModalShowOrder,
  BodyContent,
} from './styles';

export default function Orders() {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [oneOrder, setOneOrder] = useState({});
  const [reg, setReg] = useState(null);
  const [q, setQ] = useState('');
  const [visible, setVisible] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  const getFormatedStatus = order => {
    let status = {};
    if (order.canceled_at) {
      status = { text: 'CANCELADA', background: '#FAB0B0', color: '#DE3B3B' };
      return status;
    }
    if (order.end_date) {
      status = { text: 'ENTREGUE', background: '#DFF0DF', color: '#2CA42B' };
      return status;
    }
    if (order.start_date) {
      status = { text: 'RETIRADA', background: '#BAD2FF', color: '#4D85EE' };
      return status;
    }
    status = { text: 'PENDENTE', background: '#F0F0DF', color: '#C1BC35' };
    return status;
  };

  useEffect(() => {
    setLoading(true);
    async function loadOrders() {
      const response = await api.get('orders', {
        params: { page, q },
      });

      const data = response.data.rows.map(s => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return {
          ...s,
          formattedStatus: getFormatedStatus(s),
          startDateFormatted: s.start_date
            ? format(
              zonedTimeToUtc(s.start_date, timezone),
              "d 'de' MMMM 'de' yyyy",
              { locale: pt }
            )
            : null,
          endDateFormatted: s.end_date
            ? format(
              zonedTimeToUtc(s.end_date, timezone),
              "d 'de' MMMM 'de' yyyy",
              { locale: pt }
            )
            : null,
          avatarUrl:
            s.deliveryman_id && s.deliveryman.avatar
              ? s.deliveryman.avatar.url
              : `https://avatar.oxro.io/avatar?name=`,
        };
      });

      setReg(response.data.count);
      setLoading(false);
      setOrders(data);
    }
    loadOrders();
  }, [page, q, reg]);

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Deseja excluir esta encomenda?') === true) {
      try {
        const response = await api.delete(`orders/${id}`);

        if (response.data.error) {
          throw response.data;
        }

        setOrders(orders.filter(o => o.id !== id));

        toast.success('Encomenda excluída com sucesso!');
      } catch (err) {
        toast.error(err.error);
      }
    }
  }

  function handleVisible(order) {
    if (order === visible) {
      setVisible(0);
      return;
    }
    setVisible(order);
  }

  function handleShow(order) {
    setModalShow(!modalShow);
    setOneOrder(order);
  }

  return (
    <>
      <ModalShowOrder visible={modalShow}>
        <ModalBox>
          <button type="button" onClick={handleShow}>
            x
          </button>
          <p className="modalTitle">Informações da encomenda</p>
          <p>
            {oneOrder.recipient && oneOrder.recipient.street}
            <span>, </span>
            {oneOrder.recipient && oneOrder.recipient.number}
          </p>
          <p>
            {oneOrder.recipient && oneOrder.recipient.city}
            <span> - </span>
            {oneOrder.recipient && oneOrder.recipient.state}
          </p>
          <p>{oneOrder.recipient && oneOrder.recipient.cep}</p>
          <hr />
          <p className="modalTitle">Datas</p>
          <p>
            <strong>Retirada:</strong> {oneOrder && oneOrder.startDateFormatted}
          </p>
          <p>
            <strong>Entrega:</strong> {oneOrder && oneOrder.endDateFormatted}
          </p>
          <hr />
          <p className="modalTitle">Assinatura do destinatário</p>
          {oneOrder.signature ? (
            <img src={oneOrder.signature.url} alt={oneOrder.signature.name} />
          ) : (
              <p>Não há nenhuma assinatura registrada.</p>
            )}
        </ModalBox>
      </ModalShowOrder>

      <Container>
        <header>
          <p>Gerenciando encomendas</p>
        </header>
        <div>
          <div className="search">
            <MdSearch size={20} color="#999999" />

            <Input
              name="search"
              type="text"
              placeholder="Buscar por encomendas"
              value={q}
              onChange={e => [setQ(e.target.value), setPage(1)]}
            />
          </div>

          <StyledLink to="/orders/edit" type="button">
            <MdAdd size={20} color="#fff" />
            CADASTRAR
          </StyledLink>
        </div>

        <BodyContent visible={loading}>
          <div className="loadingIndicator">
            <MdRefresh size={100} color="#ccc" />
          </div>
          <div className="table">
            <div className="line lineTitle">
              <div className="tableTitle">ID</div>
              <div className="tableTitle">Destinatário</div>
              <div className="tableTitle">Entregador</div>
              <div className="tableTitle">Cidade</div>
              <div className="tableTitle">Estado</div>
              <div className="tableTitle">Status</div>
              <div className="tableTitle">Ações</div>
            </div>

            {reg !== 0 ? (
              ''
            ) : (
                <span className="noData">Nenhuma encomenda encontrada!</span>
              )}

            {orders.map(order => (
              <div key={order.id} className="line">
                <div className="tableTitle">#{order.id}</div>
                <div className="tableTitle">
                  {order.recipient_id && order.recipient.name}
                </div>
                <div className="tableTitle">
                  <img
                    src={
                      order.deliveryman && order.deliveryman.avatar
                        ? order.deliveryman.avatar.url
                        : `https://avatar.oxro.io/avatar?name=${order.deliveryman.name}`
                    }
                    alt="avatar"
                  />
                  {order.deliveryman_id
                    ? order.deliveryman.name
                    : 'Sem entregador'}
                </div>
                <div className="tableTitle">
                  {order.recipient_id && order.recipient.city}
                </div>
                <div className="tableTitle">
                  {order.recipient_id && order.recipient.state}
                </div>
                <div className="tableTitle">
                  <StatusContent id="status" status={order.formattedStatus}>
                    <span>{order.formattedStatus.text}</span>
                  </StatusContent>
                </div>
                <div className="tableTitle">
                  <ActionButton
                    focusOut={() => handleVisible(order.id)}
                    onClick={() => handleVisible(order.id)}
                  >
                    {order.id === visible ? ' X' : '...'}
                  </ActionButton>
                  <ContextMenu
                    available={
                      !(order.end_date || order.canceled_at)
                    }
                    visible={visible === order.id}
                    className={order.id}
                  >
                    <ul>
                      <li>
                        {' '}
                        <MdVisibility size={20} color="#8E5BE8" />{' '}
                        <button
                          type="button"
                          onClick={() => [setVisible(0), handleShow(order)]}
                        >
                          Visualizar
                        </button>
                      </li>
                      <li>
                        {' '}
                        <MdEdit size={20} color="#4D85EE" />{' '}
                        <button
                          type="button"
                          onClick={() =>
                            history.push(`/orders/edit/${order.id}`, { order })
                          }
                        >
                          Editar
                        </button>
                      </li>
                      <span className="actionDelete">
                        <li>
                          {' '}
                          <MdDeleteForever size={20} color="#DE3B3B" />{' '}
                          <button
                            type="button"
                            onClick={() => handleDelete(order.id)}
                          >
                            Excluir
                        </button>
                        </li>
                      </span>
                    </ul>
                  </ContextMenu>
                </div>
              </div>
            ))}
          </div>
        </BodyContent>

        <footer>
          <Button type="button" onClick={handlePrevPage} disabled={page === 1}>
            Página anterior
          </Button>
          <Button
            type="button"
            onClick={handleNextPage}
            disabled={
              (page !== 1 && reg / 4 <= page) ||
              (page === 1 && orders.length < 4) ||
              (q !== '' && reg === 4) ||
              reg === 4
            }
          >
            Próxima página
          </Button>
        </footer>
      </Container>
    </>
  );
}
