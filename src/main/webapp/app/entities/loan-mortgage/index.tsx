import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import LoanMortgage from './loan-mortgage';
import LoanMortgageDetail from './loan-mortgage-detail';
import LoanMortgageUpdate from './loan-mortgage-update';
import LoanMortgageDeleteDialog from './loan-mortgage-delete-dialog';

const LoanMortgageRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<LoanMortgage />} />
    <Route path="new" element={<LoanMortgageUpdate />} />
    <Route path=":id">
      <Route index element={<LoanMortgageDetail />} />
      <Route path="edit" element={<LoanMortgageUpdate />} />
      <Route path="delete" element={<LoanMortgageDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default LoanMortgageRoutes;
