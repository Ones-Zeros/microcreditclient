import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import WeeklyCollectionItem from './weekly-collection-item';
import WeeklyCollectionItemDetail from './weekly-collection-item-detail';
import WeeklyCollectionItemUpdate from './weekly-collection-item-update';
import WeeklyCollectionItemDeleteDialog from './weekly-collection-item-delete-dialog';

const WeeklyCollectionItemRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<WeeklyCollectionItem />} />
    <Route path="new" element={<WeeklyCollectionItemUpdate />} />
    <Route path=":id">
      <Route index element={<WeeklyCollectionItemDetail />} />
      <Route path="edit" element={<WeeklyCollectionItemUpdate />} />
      <Route path="delete" element={<WeeklyCollectionItemDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default WeeklyCollectionItemRoutes;
