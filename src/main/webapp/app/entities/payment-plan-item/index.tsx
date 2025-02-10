import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PaymentPlanItem from './payment-plan-item';
import PaymentPlanItemDetail from './payment-plan-item-detail';
import PaymentPlanItemUpdate from './payment-plan-item-update';
import PaymentPlanItemDeleteDialog from './payment-plan-item-delete-dialog';

const PaymentPlanItemRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<PaymentPlanItem />} />
    <Route path="new" element={<PaymentPlanItemUpdate />} />
    <Route path=":id">
      <Route index element={<PaymentPlanItemDetail />} />
      <Route path="edit" element={<PaymentPlanItemUpdate />} />
      <Route path="delete" element={<PaymentPlanItemDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PaymentPlanItemRoutes;
