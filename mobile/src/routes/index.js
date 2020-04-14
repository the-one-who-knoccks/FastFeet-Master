import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useSelector } from 'react-redux';

import SignIn from '~/pages/SignIn';
import Dashboard from './Dashboard';

const Stack = createStackNavigator();

export default function Routes() {
  const signedIn = useSelector(state => state.auth.signed);
  return (
    <Stack.Navigator>
      {signedIn ? (
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
