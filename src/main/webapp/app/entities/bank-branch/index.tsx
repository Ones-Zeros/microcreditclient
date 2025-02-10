import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import BankBranch from './bank-branch';
import BankBranchDetail from './bank-branch-detail';
import BankBranchUpdate from './bank-branch-update';
import BankBranchDeleteDialog from './bank-branch-delete-dialog';

const BankBranchRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<BankBranch />} />
    <Route path="new" element={<BankBranchUpdate />} />
    <Route path=":id">
      <Route index element={<BankBranchDetail />} />
      <Route path="edit" element={<BankBranchUpdate />} />
      <Route path="delete" element={<BankBranchDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BankBranchRoutes;
