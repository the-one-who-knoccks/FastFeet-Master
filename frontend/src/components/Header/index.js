import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Container, Content, Profile } from './styles';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <ul>
            <NavLink activeStyle={{ color: '#000' }} id="orders" to="/orders">
              ENCOMENDAS
            </NavLink>
            <NavLink
              activeStyle={{ color: '#000' }}
              id="deliverymans"
              to="/deliverymans"
            >
              ENTREGADORES
            </NavLink>
            <NavLink
              activeStyle={{ color: '#000' }}
              id="recipients"
              to="/recipients"
            >
              DESTINATÁRIOS
            </NavLink>
            <NavLink
              activeStyle={{ color: '#000' }}
              id="orderProblems"
              to="/order-problems"
            >
              PROBLEMAS
            </NavLink>
          </ul>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <NavLink to="/" onClick={handleSignOut}>
                Sair do sistema
              </NavLink>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
