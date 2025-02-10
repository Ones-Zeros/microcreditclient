import dayjs from 'dayjs';
import { ICustomerLoan } from 'app/shared/model/customer-loan.model';

export interface IPaymentPlan {
  id?: number;
  loanId?: number;
  insertTs?: dayjs.Dayjs | null;
  modifiedTs?: dayjs.Dayjs | null;
  customerLoan?: ICustomerLoan | null;
}

export const defaultValue: Readonly<IPaymentPlan> = {};
