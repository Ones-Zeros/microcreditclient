import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import VehicleBrand from './vehicle-brand';
import VehicleBrandDetail from './vehicle-brand-detail';
import VehicleBrandUpdate from './vehicle-brand-update';
import VehicleBrandDeleteDialog from './vehicle-brand-delete-dialog';

const VehicleBrandRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<VehicleBrand />} />
    <Route path="new" element={<VehicleBrandUpdate />} />
    <Route path=":id">
      <Route index element={<VehicleBrandDetail />} />
      <Route path="edit" element={<VehicleBrandUpdate />} />
      <Route path="delete" element={<VehicleBrandDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default VehicleBrandRoutes;
