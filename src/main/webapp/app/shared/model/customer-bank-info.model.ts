import dayjs from 'dayjs';
import { IBankBranch } from 'app/shared/model/bank-branch.model';
import { ICustomer } from 'app/shared/model/customer.model';

export interface ICustomerBankInfo {
  id?: number;
  accountNumber?: string;
  insertTs?: dayjs.Dayjs | null;
  modifiedTs?: dayjs.Dayjs | null;
  bankBranch?: IBankBranch | null;
  customer?: ICustomer | null;
}

export const defaultValue: Readonly<ICustomerBankInfo> = {};
