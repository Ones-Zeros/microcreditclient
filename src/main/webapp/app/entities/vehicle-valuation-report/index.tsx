import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import VehicleValuationReport from './vehicle-valuation-report';
import VehicleValuationReportDetail from './vehicle-valuation-report-detail';
import VehicleValuationReportUpdate from './vehicle-valuation-report-update';
import VehicleValuationReportDeleteDialog from './vehicle-valuation-report-delete-dialog';

const VehicleValuationReportRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<VehicleValuationReport />} />
    <Route path="new" element={<VehicleValuationReportUpdate />} />
    <Route path=":id">
      <Route index element={<VehicleValuationReportDetail />} />
      <Route path="edit" element={<VehicleValuationReportUpdate />} />
      <Route path="delete" element={<VehicleValuationReportDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default VehicleValuationReportRoutes;
