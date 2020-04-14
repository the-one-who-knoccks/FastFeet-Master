import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import { signInSuccess, signFailure } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
  const { id } = payload;

  const response = yield call(api.get, `deliverymans/${id}`);

  if (response.data && +response.data.id === +id) {
    yield put(signInSuccess(response.data));
    return;
  }
  yield put(signFailure());
  Alert.alert('Este ID de entregador não foi encontrado');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
