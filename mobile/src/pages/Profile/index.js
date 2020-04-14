import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { format, parseISO } from 'date-fns';

import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  Avatar,
  NameTitle,
  Name,
  EmailTitle,
  Email,
  CreatedDateTitle,
  CreatedDate,
  Logout,
  LogoutText,
} from './styles';

export default function Profile() {
  const deliveryman = useSelector(state => state.auth);

  const dispatch = useDispatch();

  async function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Avatar
        source={
          !deliveryman.avatar
            ? {
                uri: `https://ui-avatars.com/api/?name=${deliveryman.name}&background=7159c1&color=fff`,
              }
            : { uri: deliveryman.avatar.url }
        }
      />
      <NameTitle>Nome completo</NameTitle>
      <Name>{deliveryman.name}</Name>
      <EmailTitle>E-mail</EmailTitle>
      <Email>{deliveryman.email}</Email>
      <CreatedDateTitle>Data de cadastro</CreatedDateTitle>
      <CreatedDate>
        {format(parseISO(deliveryman.createdAt), 'MM/dd/yyyy')}
      </CreatedDate>
      <Logout onPress={handleLogout}>
        <LogoutText>Logout</LogoutText>
      </Logout>
    </Container>
  );
}
