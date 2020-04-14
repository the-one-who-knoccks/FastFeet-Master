import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from '@react-navigation/compat';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import {
  Container,
  ViewContainer,
  OrderBox,
  OrderName,
  ProblemsList,
  NoOrderText,
  StyledActivityIndicator,
  ProblemBox,
  ProblemDescription,
  ProblemDate,
} from './styles';

import api from '~/services/api';

function ViewProblem({ navigation, route, isFocused }) {
  const { order } = route.params;
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  async function loadProblems(pageNumber = page, shouldRefresh = false) {
    if (problems.length !== 0 && pageNumber > total) return;
    if (loading) return;

    setLoading(true);

    const response = await api.get(`delivery/${order.id}/problems`);

    const data = response.data.rows.map(problem => ({
      ...problem,
      formatedDate: format(parseISO(order.createdAt), 'MM/dd/yyyy'),
    }));

    // const formatedStartDate = item.start_date
    // ? format(parseISO(item.start_date), 'MM/dd/yyyy')
    // : null;

    const totalItems = response.data.count;
    setTotal(Math.ceil(totalItems / 7));

    setLoading(false);
    setPage(pageNumber + 1);
    setProblems(shouldRefresh ? data : [...problems, ...data]);
  }

  function refreshList() {
    setRefreshing(true);
    loadProblems(1, true);
    setRefreshing(false);
  }

  useEffect(() => {
    loadProblems();
  }, []);

  useEffect(() => {
    if (total === 0) {
      setTotal(1);
    }
    async function loadList() {
      refreshList();
    }
    loadList();

  }, []);

  return (
    <Container>
      <OrderBox>
        <OrderName>Encomenda {order.id}</OrderName>
      </OrderBox>
      <ViewContainer>
        <ProblemsList
          key="list"
          data={problems}
          keyExtractor={item => String(item.id)}
          onRefresh={refreshList}
          refreshing={refreshing}
          onEndReachedThreshold={0.01}
          bounces={false}
          onEndReached={() => loadProblems()}
          ListFooterComponent={() => (
            <>
              {problems.length === 0 && (
                <NoOrderText>Não há nenhum problema.</NoOrderText>
              )}

              {loading && <StyledActivityIndicator size="small" color="#000" />}
            </>
          )}
          renderItem={({ item }) => (
            <ProblemBox>
              <ProblemDate>{item.formatedDate}</ProblemDate>
              <ProblemDescription>{item.description}</ProblemDescription>
            </ProblemBox>
          )}
        />
      </ViewContainer>
    </Container>
  );
}

export default withNavigationFocus(ViewProblem);

ViewProblem.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  isFocused: PropTypes.bool,
};

ViewProblem.defaultProps = {
  isFocused: false,
};
