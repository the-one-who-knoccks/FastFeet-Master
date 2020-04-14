import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';

import './config/ReactotronConfig';

import { store, persistor } from './store';

import Routes from './routes';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
