import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CollectorRoute from './collector-route';
import CollectorRouteDetail from './collector-route-detail';
import CollectorRouteUpdate from './collector-route-update';
import CollectorRouteDeleteDialog from './collector-route-delete-dialog';

const CollectorRouteRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CollectorRoute />} />
    <Route path="new" element={<CollectorRouteUpdate />} />
    <Route path=":id">
      <Route index element={<CollectorRouteDetail />} />
      <Route path="edit" element={<CollectorRouteUpdate />} />
      <Route path="delete" element={<CollectorRouteDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CollectorRouteRoutes;
