import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import InstallmentPlan from './installment-plan';
import InstallmentPlanDetail from './installment-plan-detail';
import InstallmentPlanUpdate from './installment-plan-update';
import InstallmentPlanDeleteDialog from './installment-plan-delete-dialog';

const InstallmentPlanRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<InstallmentPlan />} />
    <Route path="new" element={<InstallmentPlanUpdate />} />
    <Route path=":id">
      <Route index element={<InstallmentPlanDetail />} />
      <Route path="edit" element={<InstallmentPlanUpdate />} />
      <Route path="delete" element={<InstallmentPlanDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default InstallmentPlanRoutes;
