import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-fastfeet.png';

import { Body, Container, Image, Form, Input, SubmitButton } from './styles';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const [id, setId] = useState('');

  const loading = useSelector(state => state.auth.loading);

  async function handleSubmit(idStudent) {
    if (id === '') {
      Alert.alert('O ID precisa ser preenchido.');
      return;
    }

    dispatch(signInRequest(idStudent));
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />

      <Body>
        <Container>
          <Image source={logo} alt="FastFeet" />
          <Form>
            <Input
              keyboardType="number-pad"
              autoCorrect={false}
              returnKeyType="send"
              placeholder="Informe seu ID de cadastro"
              onChangeText={setId}
              onSubmitEditing={() => handleSubmit(id)}
              value={id}
            />
            <SubmitButton loading={loading} onPress={() => handleSubmit(id)}>
              Entrar no sistema
            </SubmitButton>
          </Form>
        </Container>
      </Body>
    </>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.object.isRequired,
};
