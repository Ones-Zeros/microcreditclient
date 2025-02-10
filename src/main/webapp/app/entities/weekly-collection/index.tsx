import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import WeeklyCollection from './weekly-collection';
import WeeklyCollectionDetail from './weekly-collection-detail';
import WeeklyCollectionUpdate from './weekly-collection-update';
import WeeklyCollectionDeleteDialog from './weekly-collection-delete-dialog';

const WeeklyCollectionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<WeeklyCollection />} />
    <Route path="new" element={<WeeklyCollectionUpdate />} />
    <Route path=":id">
      <Route index element={<WeeklyCollectionDetail />} />
      <Route path="edit" element={<WeeklyCollectionUpdate />} />
      <Route path="delete" element={<WeeklyCollectionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default WeeklyCollectionRoutes;
