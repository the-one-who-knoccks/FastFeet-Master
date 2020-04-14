import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from '@react-navigation/compat';
import PropTypes from 'prop-types';

import { format, parseISO } from 'date-fns';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { signOut } from '~/store/modules/auth/actions';

import {
  StyledActivityIndicator,
  Container,
  Header,
  DeliverymanAvatar,
  Avatar,
  DeliverymanData,
  WelcomeData,
  DeliverymanName,
  Logout,
  Orders,
  OrdersHeader,
  OrdersHeaderText,
  OrdersHeaderLink,
  OrdersHeaderLinkText,
  OrderList,
  OrderText,
  OrdersLinksContainer,
  OrderBox,
  OrderTitle,
  OrderDetails,
  OrderDate,
  OrderDateTextTitle,
  OrderDateText,
  OrderCity,
  OrderCityTextTitle,
  OrderCityText,
  OrderViewDetails,
  OrderViewDetailsText,
  OrderProgressBar,
  ProgressBar,
  ProgressBarContent,
  ProgressBarDots,
  ProgressBarMessages,
  WaitingDot,
  WaitingText,
  WithdrawDot,
  WithdrawText,
  DeliveredDot,
  DeliveredText,
  NoOrderText,
} from './styles';

import api from '~/services/api';

function Dashboard({ navigation, isFocused }) {
  const deliveryman = useSelector(state => state.auth);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [delivered, setDelivered] = useState(false);

  const dispatch = useDispatch();

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (orders.length !== 0 && pageNumber > total) return;
    if (loading) return;

    setLoading(true);

    const response = await api.get(`deliveryman/${deliveryman.id}/orders`, {
      params: { page: pageNumber, delivered },
    });
    const data = response.data.rows.map(order => ({
      ...order,
      formattedDate: format(parseISO(order.createdAt), 'MM/dd/yyyy'),
    }));

    const totalItems = response.data.count;
    setTotal(Math.ceil(totalItems / 7));

    setLoading(false);
    setPage(pageNumber + 1);
    setOrders(shouldRefresh ? data : [...orders, ...data]);
  }

  function refreshList() {
    setRefreshing(true);
    loadPage(1, true);

    setRefreshing(false);
  }

  useEffect(() => {
    loadPage();
  }, []);

  useEffect(() => {
    if (total === 0) {
      setTotal(1);
    }
    async function loadList() {
      console.tron.log(delivered);
      refreshList();
    }
    loadList();
  }, [isFocused, delivered]);

  async function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Header>
        <DeliverymanAvatar>
          <Avatar
            source={
              !deliveryman.avatar
                ? {
                    uri: `https://ui-avatars.com/api/?name=${deliveryman.name}&background=7159c1&color=fff`,
                  }
                : { uri: deliveryman.avatar.url }
            }
          />
        </DeliverymanAvatar>
        <DeliverymanData>
          <WelcomeData>Bem vindo de volta,</WelcomeData>
          <DeliverymanName>{deliveryman.name}</DeliverymanName>
        </DeliverymanData>
        <Logout onPress={handleLogout}>
          <Icon name="exit-to-app" size={30} color="#E74040" />
        </Logout>
      </Header>

      <Orders>
        <OrdersHeader>
          <OrdersHeaderText>Entregas</OrdersHeaderText>

          <OrdersLinksContainer>
            <OrdersHeaderLink>
              <OrdersHeaderLinkText
                active={!delivered}
                onPress={() => setDelivered(false)}
              >
                Pendentes
              </OrdersHeaderLinkText>
            </OrdersHeaderLink>
            <OrdersHeaderLink>
              <OrdersHeaderLinkText
                active={delivered}
                onPress={() => setDelivered(true)}
              >
                Entregues
              </OrdersHeaderLinkText>
            </OrdersHeaderLink>
          </OrdersLinksContainer>
        </OrdersHeader>

        <OrderList
          key="list"
          data={orders}
          keyExtractor={item => String(item.id)}
          onRefresh={refreshList}
          refreshing={refreshing}
          onEndReachedThreshold={0.01}
          bounces={false}
          onEndReached={() => loadPage()}
          ListFooterComponent={() => (
            <>
              {orders.length === 0 && (
                <NoOrderText>Não há nenhuma entrega.</NoOrderText>
              )}

              {loading && <StyledActivityIndicator size="small" color="#000" />}
            </>
          )}
          renderItem={({ item }) => (
            <OrderBox>
              <OrderTitle>
                <Icon
                  name="local-shipping"
                  size={25}
                  color={item.canceled_at ? '#E74040' : '#7D40E7'}
                />
                <OrderText canceled={item.canceled_at}>
                  Encomenda {item.id}
                </OrderText>
              </OrderTitle>

              <OrderProgressBar>
                <ProgressBar canceled={item.canceled_at} />
                <ProgressBarContent>
                  <ProgressBarDots>
                    <WaitingDot
                      canceled={item.canceled_at}
                      active={!item.start_date || item.start_date}
                    />
                    <WithdrawDot
                      canceled={item.canceled_at}
                      active={item.start_date}
                    />
                    <DeliveredDot
                      canceled={item.canceled_at}
                      active={item.end_date}
                    />
                  </ProgressBarDots>
                  <ProgressBarMessages>
                    <WaitingText
                      canceled={item.canceled_at}
                      active={!item.start_date || item.start_date}
                    >{`Aguardando\nRetirada`}</WaitingText>
                    <WithdrawText
                      canceled={item.canceled_at}
                      active={item.start_date}
                    >
                      Retirada
                    </WithdrawText>
                    <DeliveredText
                      canceled={item.canceled_at}
                      active={item.end_date}
                    >
                      Entregue
                    </DeliveredText>
                  </ProgressBarMessages>
                </ProgressBarContent>
              </OrderProgressBar>

              <OrderDetails>
                <OrderDate>
                  <OrderDateTextTitle>Data</OrderDateTextTitle>
                  <OrderDateText>{item.formattedDate}</OrderDateText>
                </OrderDate>
                <OrderCity>
                  <OrderCityTextTitle>Cidade</OrderCityTextTitle>
                  <OrderCityText>{item.recipient.city}</OrderCityText>
                </OrderCity>
                <OrderViewDetails
                  onPress={() => navigation.navigate('OrderDetail', { item })}
                >
                  <OrderViewDetailsText canceled={item.canceled_at}>
                    Ver detalhes
                  </OrderViewDetailsText>
                </OrderViewDetails>
              </OrderDetails>
            </OrderBox>
          )}
        />
      </Orders>
    </Container>
  );
}

export default withNavigationFocus(Dashboard);

Dashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
  isFocused: PropTypes.bool,
};

Dashboard.defaultProps = {
  isFocused: false,
};
