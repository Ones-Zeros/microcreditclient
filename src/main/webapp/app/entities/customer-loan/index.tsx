import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CustomerLoan from './customer-loan';
import CustomerLoanDetail from './customer-loan-detail';
import CustomerLoanUpdate from './customer-loan-update';
import CustomerLoanDeleteDialog from './customer-loan-delete-dialog';

const CustomerLoanRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CustomerLoan />} />
    <Route path="new" element={<CustomerLoanUpdate />} />
    <Route path=":id">
      <Route index element={<CustomerLoanDetail />} />
      <Route path="edit" element={<CustomerLoanUpdate />} />
      <Route path="delete" element={<CustomerLoanDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CustomerLoanRoutes;
