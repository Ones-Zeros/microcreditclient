import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CollectorCollectionRoute from './collector-collection-route';
import CollectorCollectionRouteDetail from './collector-collection-route-detail';
import CollectorCollectionRouteUpdate from './collector-collection-route-update';
import CollectorCollectionRouteDeleteDialog from './collector-collection-route-delete-dialog';

const CollectorCollectionRouteRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CollectorCollectionRoute />} />
    <Route path="new" element={<CollectorCollectionRouteUpdate />} />
    <Route path=":id">
      <Route index element={<CollectorCollectionRouteDetail />} />
      <Route path="edit" element={<CollectorCollectionRouteUpdate />} />
      <Route path="delete" element={<CollectorCollectionRouteDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CollectorCollectionRouteRoutes;
