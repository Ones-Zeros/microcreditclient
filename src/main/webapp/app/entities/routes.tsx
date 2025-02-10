import React from 'react';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Bank from './bank';
import BankBranch from './bank-branch';
import Customer from './customer';
import LoanTemplate from './loan-template';
import CustomerLoan from './customer-loan';
import Guarantor from './guarantor';
import InstallmentPlan from './installment-plan';
import LoanMortgage from './loan-mortgage';
import PaymentPlan from './payment-plan';
import PaymentPlanItem from './payment-plan-item';
import WeeklyCollection from './weekly-collection';
import WeeklyCollectionItem from './weekly-collection-item';
import CollectorRoute from './collector-route';
import CollectorCollectionRoute from './collector-collection-route';
import VehicleValuationReport from './vehicle-valuation-report';
import VehicleModel from './vehicle-model';
import VehicleBrand from './vehicle-brand';
import CustomerBankInfo from './customer-bank-info';
import InstallmentPlanItem from './installment-plan-item';
import { Route } from 'react-router';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="bank/*" element={<Bank />} />
        <Route path="bank-branch/*" element={<BankBranch />} />
        <Route path="customer/*" element={<Customer />} />
        <Route path="loan-template/*" element={<LoanTemplate />} />
        <Route path="customer-loan/*" element={<CustomerLoan />} />
        <Route path="guarantor/*" element={<Guarantor />} />
        <Route path="installment-plan/*" element={<InstallmentPlan />} />
        <Route path="loan-mortgage/*" element={<LoanMortgage />} />
        <Route path="payment-plan/*" element={<PaymentPlan />} />
        <Route path="payment-plan-item/*" element={<PaymentPlanItem />} />
        <Route path="weekly-collection/*" element={<WeeklyCollection />} />
        <Route path="weekly-collection-item/*" element={<WeeklyCollectionItem />} />
        <Route path="collector-route/*" element={<CollectorRoute />} />
        <Route path="collector-collection-route/*" element={<CollectorCollectionRoute />} />
        <Route path="vehicle-valuation-report/*" element={<VehicleValuationReport />} />
        <Route path="vehicle-model/*" element={<VehicleModel />} />
        <Route path="vehicle-brand/*" element={<VehicleBrand />} />
        <Route path="customer-bank-info/*" element={<CustomerBankInfo />} />
        <Route path="installment-plan-item/*" element={<InstallmentPlanItem />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
