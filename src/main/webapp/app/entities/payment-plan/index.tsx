import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PaymentPlan from './payment-plan';
import PaymentPlanDetail from './payment-plan-detail';
import PaymentPlanUpdate from './payment-plan-update';
import PaymentPlanDeleteDialog from './payment-plan-delete-dialog';

const PaymentPlanRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<PaymentPlan />} />
    <Route path="new" element={<PaymentPlanUpdate />} />
    <Route path=":id">
      <Route index element={<PaymentPlanDetail />} />
      <Route path="edit" element={<PaymentPlanUpdate />} />
      <Route path="delete" element={<PaymentPlanDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PaymentPlanRoutes;
