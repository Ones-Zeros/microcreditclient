import bank from 'app/entities/bank/bank.reducer';
import bankBranch from 'app/entities/bank-branch/bank-branch.reducer';
import customer from 'app/entities/customer/customer.reducer';
import loanTemplate from 'app/entities/loan-template/loan-template.reducer';
import customerLoan from 'app/entities/customer-loan/customer-loan.reducer';
import guarantor from 'app/entities/guarantor/guarantor.reducer';
import installmentPlan from 'app/entities/installment-plan/installment-plan.reducer';
import loanMortgage from 'app/entities/loan-mortgage/loan-mortgage.reducer';
import paymentPlan from 'app/entities/payment-plan/payment-plan.reducer';
import paymentPlanItem from 'app/entities/payment-plan-item/payment-plan-item.reducer';
import weeklyCollection from 'app/entities/weekly-collection/weekly-collection.reducer';
import weeklyCollectionItem from 'app/entities/weekly-collection-item/weekly-collection-item.reducer';
import collectorRoute from 'app/entities/collector-route/collector-route.reducer';
import collectorCollectionRoute from 'app/entities/collector-collection-route/collector-collection-route.reducer';
import vehicleValuationReport from 'app/entities/vehicle-valuation-report/vehicle-valuation-report.reducer';
import vehicleModel from 'app/entities/vehicle-model/vehicle-model.reducer';
import vehicleBrand from 'app/entities/vehicle-brand/vehicle-brand.reducer';
import customerBankInfo from 'app/entities/customer-bank-info/customer-bank-info.reducer';
import installmentPlanItem from 'app/entities/installment-plan-item/installment-plan-item.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  bank,
  bankBranch,
  customer,
  loanTemplate,
  customerLoan,
  guarantor,
  installmentPlan,
  loanMortgage,
  paymentPlan,
  paymentPlanItem,
  weeklyCollection,
  weeklyCollectionItem,
  collectorRoute,
  collectorCollectionRoute,
  vehicleValuationReport,
  vehicleModel,
  vehicleBrand,
  customerBankInfo,
  installmentPlanItem,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
