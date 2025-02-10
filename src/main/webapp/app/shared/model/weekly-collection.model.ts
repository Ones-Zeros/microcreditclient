import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { ICustomerLoan } from 'app/shared/model/customer-loan.model';

export interface IWeeklyCollection {
  id?: number;
  description?: string | null;
  insertTs?: dayjs.Dayjs | null;
  modifiedTs?: dayjs.Dayjs | null;
  createdBy?: IUser | null;
  modifiedBy?: IUser | null;
  customerLoan?: ICustomerLoan | null;
}

export const defaultValue: Readonly<IWeeklyCollection> = {};
