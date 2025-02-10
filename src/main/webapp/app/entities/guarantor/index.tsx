import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Guarantor from './guarantor';
import GuarantorDetail from './guarantor-detail';
import GuarantorUpdate from './guarantor-update';
import GuarantorDeleteDialog from './guarantor-delete-dialog';

const GuarantorRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Guarantor />} />
    <Route path="new" element={<GuarantorUpdate />} />
    <Route path=":id">
      <Route index element={<GuarantorDetail />} />
      <Route path="edit" element={<GuarantorUpdate />} />
      <Route path="delete" element={<GuarantorDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default GuarantorRoutes;
