import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdVisibility, MdDeleteForever, MdRefresh } from 'react-icons/md';

import api from '~/services/api';

import {
  Container,
  Button,
  ActionButton,
  ContextMenu,
  ModalOrder,
  ModalBox,
  BodyContent,
} from './styles';

export default function OrderProblems() {
  const [page, setPage] = useState(1);
  const [orderProblems, setOrderProblems] = useState([]);
  const [oneProblem, setOneProblem] = useState({});
  const [reg, setReg] = useState(null);
  const [visible, setVisible] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  useEffect(() => {
    setLoading(true);
    async function loadOrderProblems() {
      const response = await api.get('delivery-problems', {
        params: { page },
      });

      const data = response.data.rows.map(s => {
        return {
          ...s,
          shortDescription:
            s.description.length > 100
              ? `${s.description.substring(0, 100)}...`
              : s.description,
        };
      });
      setReg(response.data.count);
      setLoading(false);
      setOrderProblems(data);
    }
    loadOrderProblems();
  }, [page, reg]);

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Deseja cancelar esta encomenda?') === true) {
      try {
        const response = await api.delete(`problem/${id}/cancel-delivery`);

        if (response.data.error) {
          throw response.data;
        }

        toast.success('Encomenda cancelada com sucesso!');
        setVisible(0);
      } catch (err) {
        toast.error(err.response.data.error);
        setVisible(0);
      }
    }
  }

  function handleVisible(orderProblem) {
    if (orderProblem === visible) {
      setVisible(0);
      return;
    }
    setVisible(orderProblem);
  }

  function handleShow(orderProblem) {
    setModalShow(!modalShow);
    setOneProblem(orderProblem);
  }

  return (
    <>
      <ModalOrder visible={modalShow}>
        <ModalBox>
          <button type="button" onClick={handleShow}>
            X
          </button>
          <p className="modalTitle">VISUALIZAR PROBLEMA</p>
          <p>{oneProblem && oneProblem.description}</p>
        </ModalBox>
      </ModalOrder>
      <Container>
        <header>
          <p>Problemas na entrega</p>
        </header>

        <BodyContent visible={loading}>
          <div className="loadingIndicator">
            <MdRefresh size={100} color="#ccc" />
          </div>

          <div className="table">
            <div className="line lineTitle">
              <div className="tableTitle">Encomenda</div>
              <div className="tableTitle">Problemas</div>
              <div className="tableTitle">Ações</div>
            </div>

            {reg !== 0 ? (
              ''
            ) : (
                <span className="noData">Nenhum problema encontrado.</span>
              )}

            {orderProblems.map(orderP => (
              <div key={orderP.id} className="line">
                <div className="tableTitle">#{orderP.delivery.id}</div>
                <div className="tableTitle">{orderP.shortDescription}</div>
                <div className="tableTitle">
                  <ActionButton
                    focusOut={() => handleVisible(orderP.id)}
                    onClick={() => handleVisible(orderP.id)}
                  >
                    {orderP.id === visible ? ' X' : '...'}
                  </ActionButton>
                  <ContextMenu
                    available={
                      !(orderP.delivery.end_date || orderP.delivery.canceled_at)
                    }
                    visible={visible === orderP.id}
                    className={orderP.id}
                  >
                    <ul>
                      <li>
                        <MdVisibility size={20} color="#8E5BE8" />
                        <button
                          type="button"
                          onClick={() => [setVisible(0), handleShow(orderP)]}
                        >
                          Visualizar
                        </button>
                      </li>
                      <span className="actionDelete">
                        <li>
                          <MdDeleteForever size={20} color="#DE3B3B" />
                          <button
                            type="button"
                            onClick={() => handleDelete(orderP.id)}
                          >
                            Cancelar encomenda
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
              (page !== 1 && reg / 5 <= page) ||
              (page === 1 && orderProblems.length < 5) ||
              reg === 5
            }
          >
            Próxima página
          </Button>
        </footer>
      </Container>
    </>
  );
}
