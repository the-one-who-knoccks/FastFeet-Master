import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Sign from '../pages/Sign';

import DeliveryMans from '../pages/DeliveryMans';
import DeliveryMansForm from '../pages/DeliveryMansForm';
import OrderProblems from '../pages/OrderProblems';
import Orders from '../pages/Orders';
import OrdersForm from '../pages/OrdersForm';
import Recipients from '../pages/Recipients';
import RecipientsForm from '../pages/RecipientsForm';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Sign} />

      <Route path="/orders" exact component={Orders} isPrivate />
      <Route path="/deliverymans" exact component={DeliveryMans} isPrivate />
      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route path="/order-problems" exact component={OrderProblems} isPrivate />
      <Route path="/orders/edit" component={OrdersForm} isPrivate />
      <Route path="/recipients/edit" component={RecipientsForm} isPrivate />
      <Route path="/deliverymans/edit" component={DeliveryMansForm} isPrivate />
    </Switch>
  );
}
