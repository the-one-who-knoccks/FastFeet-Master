import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Order from '~/pages/Dashboard';
import OrderDetail from '~/pages/Dashboard/OrderDetails';
import ReportProblem from '~/pages/Dashboard/ReportProblem';
import ConfirmDelivery from '~/pages/Dashboard/ConfirmDelivery';
import ViewProblem from '~/pages/Dashboard/ViewProblem';

const Stack = createStackNavigator();

export default function OrderNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{
          headerTitle: 'Detalhes da encomenda',
          headerStyle: {
            backgroundColor: '#7D40E7',
            elevation: 0,
            height: 150,
          },
          headerLeftContainerStyle: {
            paddingBottom: 70,
          },
          headerTitleContainerStyle: {
            paddingBottom: 70,
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="ReportProblem"
        component={ReportProblem}
        options={{
          headerShown: true,
          headerTitle: 'Informar um problema',
          headerStyle: {
            backgroundColor: '#7D40E7',
            elevation: 0,
            height: 150,
          },
          headerLeftContainerStyle: {
            paddingBottom: 70,
          },
          headerTitleContainerStyle: {
            paddingBottom: 70,
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="ViewProblem"
        component={ViewProblem}
        options={{
          headerShown: true,
          headerTitle: 'Visualizar problemas',
          headerStyle: {
            backgroundColor: '#7D40E7',
            elevation: 0,
            height: 150,
          },
          headerLeftContainerStyle: {
            paddingBottom: 70,
          },
          headerTitleContainerStyle: {
            paddingBottom: 70,
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="ConfirmDelivery"
        component={ConfirmDelivery}
        options={{
          headerShown: true,
          headerTitle: 'Confirmar entrega',
          headerStyle: {
            backgroundColor: '#7D40E7',
            elevation: 0,
            height: 150,
          },
          headerLeftContainerStyle: {
            paddingBottom: 70,
          },
          headerTitleContainerStyle: {
            paddingBottom: 70,
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}
