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

export default function Recipients() {
  const [page, setPage] = useState(1);
  const [recipients, setRecipients] = useState([]);
  const [reg, setReg] = useState(null);
  const [q, setQ] = useState('');
  const [visible, setVisible] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function loadRecipients() {
      const response = await api.get('recipients', {
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
      setRecipients(data);
    }
    loadRecipients();
  }, [page, q, reg]);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Deseja excluir este destinatário?') === true) {
      try {
        const response = await api.delete(`recipients/${id}`);

        if (response.data.error) {
          throw response.data;
        }

        setRecipients(recipients.filter(r => r.id !== id));

        toast.success('O destinatário foi excluído com sucesso!');
      } catch (err) {
        toast.error(err.response.data.error);
        setVisible(0);
      }
    }
  }

  function handleVisible(recip) {
    if (recip === visible) {
      setVisible(0);
      return;
    }
    setVisible(recip);
  }

  return (
    <Container>
      <header>
        <p>Gerenciando destinatários</p>
      </header>
      <div>
        <div className="search">
          <MdSearch size={20} color="#999999" />

          <Input
            name="search"
            type="text"
            placeholder="Buscar destinatários"
            value={q}
            onChange={e => [setQ(e.target.value), setPage(1)]}
          />
        </div>

        <StyledLink to="/recipients/edit" type="button">
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
            <div className="tableTitle">Nome</div>
            <div className="tableTitle">Endereço</div>
            <div className="tableTitle">Ações</div>
          </div>

          {reg !== 0 ? (
            ''
          ) : (
            <span className="noData">Nenhum destinatário encontrado.</span>
          )}

          {recipients.map(recip => (
            <div key={recip.id} className="line">
              <div className="tableTitle">#{recip.id}</div>
              <div className="tableTitle">{recip.name}</div>
              <div className="tableTitle">
                {recip.street}, {recip.number}, {recip.city} - {recip.state}
                {recip.complement ? ` - ${recip.complement}` : ''}
              </div>

              <div className="tableTitle">
                <ActionButton
                  focusOut={() => handleVisible(recip.id)}
                  onClick={() => handleVisible(recip.id)}
                >
                  {recip.id === visible ? ' X' : '...'}
                </ActionButton>
                <ContextMenu
                  visible={visible === recip.id}
                  className={recip.id}
                >
                  <ul>
                    <li>
                      {' '}
                      <MdEdit size={20} color="#4D85EE" />{' '}
                      <button
                        type="button"
                        onClick={() =>
                          history.push(`/recipients/edit/${recip.id}`, {
                            recip,
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
                        onClick={() => handleDelete(recip.id)}
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
            (page !== 1 && reg / 5 <= page) ||
            (page === 1 && recipients.length < 5) ||
            (q !== '' && reg === 5) ||
            reg === 5
          }
        >
          Próxima página
        </Button>
      </footer>
    </Container>
  );
}
