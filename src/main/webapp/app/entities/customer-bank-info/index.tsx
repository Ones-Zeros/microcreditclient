import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CustomerBankInfo from './customer-bank-info';
import CustomerBankInfoDetail from './customer-bank-info-detail';
import CustomerBankInfoUpdate from './customer-bank-info-update';
import CustomerBankInfoDeleteDialog from './customer-bank-info-delete-dialog';

const CustomerBankInfoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CustomerBankInfo />} />
    <Route path="new" element={<CustomerBankInfoUpdate />} />
    <Route path=":id">
      <Route index element={<CustomerBankInfoDetail />} />
      <Route path="edit" element={<CustomerBankInfoUpdate />} />
      <Route path="delete" element={<CustomerBankInfoDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CustomerBankInfoRoutes;
