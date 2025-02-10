import dayjs from 'dayjs';
import { ICustomerLoan } from 'app/shared/model/customer-loan.model';
import { MortgageType } from 'app/shared/model/enumerations/mortgage-type.model';

export interface ILoanMortgage {
  id?: number;
  loanId?: number;
  type?: keyof typeof MortgageType;
  insertTs?: dayjs.Dayjs | null;
  modifiedTs?: dayjs.Dayjs | null;
  customerLoan?: ICustomerLoan | null;
}

export const defaultValue: Readonly<ILoanMortgage> = {};
