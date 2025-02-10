import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import LoanTemplate from './loan-template';
import LoanTemplateDetail from './loan-template-detail';
import LoanTemplateUpdate from './loan-template-update';
import LoanTemplateDeleteDialog from './loan-template-delete-dialog';

const LoanTemplateRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<LoanTemplate />} />
    <Route path="new" element={<LoanTemplateUpdate />} />
    <Route path=":id">
      <Route index element={<LoanTemplateDetail />} />
      <Route path="edit" element={<LoanTemplateUpdate />} />
      <Route path="delete" element={<LoanTemplateDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default LoanTemplateRoutes;
