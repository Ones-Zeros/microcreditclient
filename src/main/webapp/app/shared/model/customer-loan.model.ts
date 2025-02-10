import dayjs from 'dayjs';
import { IVehicleValuationReport } from 'app/shared/model/vehicle-valuation-report.model';
import { IInstallmentPlan } from 'app/shared/model/installment-plan.model';
import { IUser } from 'app/shared/model/user.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { ILoanTemplate } from 'app/shared/model/loan-template.model';
import { PaymentType } from 'app/shared/model/enumerations/payment-type.model';
import { LoanStatus } from 'app/shared/model/enumerations/loan-status.model';

export interface ICustomerLoan {
  id?: number;
  loanId?: string;
  amount?: number;
  loanPaymentType?: keyof typeof PaymentType;
  loanPeriod?: number;
  createdDate?: dayjs.Dayjs;
  lastModifiedDate?: dayjs.Dayjs | null;
  paymentStartDate?: dayjs.Dayjs | null;
  paymentEndDate?: dayjs.Dayjs | null;
  status?: keyof typeof LoanStatus;
  insertTs?: dayjs.Dayjs | null;
  modifiedTs?: dayjs.Dayjs | null;
  valuationReport?: IVehicleValuationReport | null;
  installmentPlan?: IInstallmentPlan | null;
  createdBy?: IUser | null;
  modifiedBy?: IUser | null;
  customer?: ICustomer | null;
  loanTemplate?: ILoanTemplate | null;
}

export const defaultValue: Readonly<ICustomerLoan> = {};
