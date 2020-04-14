import React from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import OrderNavigator from '../Order';
import Profile from '~/pages/Profile';

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#7d40e7',
          style: {
            height: 70,
            paddingTop: 15,
            paddingBottom: 15,
          },
        }}
      >
        <Tab.Screen
          name="Entregas"
          component={OrderNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="reorder"
                color={focused ? '#7D40E7' : '#ddd'}
                size={32}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Meu Perfil"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="account-circle"
                color={focused ? '#7D40E7' : '#ddd'}
                size={32}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

Dashboard.propTypes = {
  focused: PropTypes.bool,
};

Dashboard.defaultProps = {
  focused: false,
};
