import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import InstallmentPlanItem from './installment-plan-item';
import InstallmentPlanItemDetail from './installment-plan-item-detail';
import InstallmentPlanItemUpdate from './installment-plan-item-update';
import InstallmentPlanItemDeleteDialog from './installment-plan-item-delete-dialog';

const InstallmentPlanItemRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<InstallmentPlanItem />} />
    <Route path="new" element={<InstallmentPlanItemUpdate />} />
    <Route path=":id">
      <Route index element={<InstallmentPlanItemDetail />} />
      <Route path="edit" element={<InstallmentPlanItemUpdate />} />
      <Route path="delete" element={<InstallmentPlanItemDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default InstallmentPlanItemRoutes;
