import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Input } from '@rocketseat/unform';
import {
  MdAdd,
  MdSearch,
  MdEdit,
  MdDeleteForever,
  MdRefresh,
} from 'react-icons/md';

import {
  Container,
  StyledLink,
  ActionButton,
  ContextMenu,
  Button,
  BodyContent,
} from './styles';

import api from '~/services/api';

import history from '~/services/history';

export default function DeliveryMans() {
  const [page, setPage] = useState(1);
  const [deliverymans, setDeliverymans] = useState([]);
  const [reg, setReg] = useState(null);
  const [q, setQ] = useState('');
  const [visible, setVisible] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function loadDeliverymans() {
      const response = await api.get('deliverymans', {
        params: { page, q },
      });

      const data = response.data.rows.map(s => {
        return {
          ...s,
          avatarUrl: s.avatar
            ? s.avatar.url
            : `https://avatar.oxro.io/avatar?name=${s.name}`,
        };
      });

      setReg(response.data.count);
      setLoading(false);
      setDeliverymans(data);
    }
    loadDeliverymans();
  }, [page, q, reg]);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Deseja excluir este entregador?') === true) {
      try {
        const response = await api.delete(`deliverymans/${id}`);

        if (response.data.error) {
          throw response.data;
        }

        setDeliverymans(deliverymans.filter(d => d.id !== id));

        toast.success('O entregador excluído com sucesso!');
      } catch (err) {
        toast.error(err.error);
      }
    }
  }

  function handleVisible(dman) {
    if (dman === visible) {
      setVisible(0);
      return;
    }
    setVisible(dman);
  }

  return (
    <Container>
      <header>
        <p>Gerenciando entregadores</p>
      </header>
      <div>
        <div className="search">
          <MdSearch size={20} color="#999999" />

          <Input
            name="search"
            type="text"
            placeholder="Buscar por entregadores"
            value={q}
            onChange={e => [setQ(e.target.value), setPage(1)]}
          />
        </div>

        <StyledLink to="/deliverymans/edit" type="button">
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
            <div className="tableTitle">Foto</div>
            <div className="tableTitle">Nome</div>
            <div className="tableTitle">Email</div>
            <div className="tableTitle">Ações</div>
          </div>

          {reg !== 0 ? (
            ''
          ) : (
              <span className="noData">Nenhum entregador encontrado!</span>
            )}

          {deliverymans.map(dman => (
            <div key={dman.id} className="line">
              <div className="tableTitle">#{dman.id}</div>
              <div className="tableTitle">
                <img src={dman.avatarUrl} alt="avatar" />
              </div>
              <div className="tableTitle">{dman.name}</div>
              <div className="tableTitle">{dman.email}</div>

              <div className="tableTitle">
                <ActionButton
                  focusOut={() => handleVisible(dman.id)}
                  onClick={() => handleVisible(dman.id)}
                >
                  {dman.id === visible ? ' X' : '...'}
                </ActionButton>
                <ContextMenu visible={visible === dman.id} className={dman.id}>
                  <ul>
                    <li>
                      {' '}
                      <MdEdit size={20} color="#4D85EE" />{' '}
                      <button
                        type="button"
                        onClick={() =>
                          history.push(`/deliverymans/edit/${dman.id}`, {
                            dman,
                          })
                        }
                      >
                        Editar
                      </button>
                    </li>
                    <li>
                      {' '}
                      <MdDeleteForever size={20} color="#DE3B3B" />{' '}
                      <button
                        type="button"
                        onClick={() => handleDelete(dman.id)}
                      >
                        Excluir
                      </button>
                    </li>
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
            (page === 1 && deliverymans.length < 4) ||
            (q !== '' && reg === 4) ||
            reg === 4
          }
        >
          Próxima página
        </Button>
      </footer>
    </Container>
  );
}
