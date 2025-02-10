import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { CustomerStatus } from 'app/shared/model/enumerations/customer-status.model';

export interface ICustomer {
  id?: number;
  custId?: string;
  nic?: string;
  custName?: string;
  address1?: string;
  address2?: string | null;
  city?: string | null;
  phone1?: string;
  phone2?: string | null;
  email?: string | null;
  creditLimit?: number;
  photoContentType?: string;
  photo?: string;
  status?: keyof typeof CustomerStatus;
  insertTs?: dayjs.Dayjs | null;
  modifiedTs?: dayjs.Dayjs | null;
  createdBy?: IUser | null;
  modifiedBy?: IUser | null;
}

export const defaultValue: Readonly<ICustomer> = {};
