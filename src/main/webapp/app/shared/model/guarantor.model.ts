import dayjs from 'dayjs';
import { ICustomerLoan } from 'app/shared/model/customer-loan.model';

export interface IGuarantor {
  id?: number;
  nic?: string;
  guarantorName?: string;
  phone1?: string;
  address1?: string;
  address2?: string | null;
  city?: string | null;
  pictureContentType?: string;
  picture?: string;
  insertTs?: dayjs.Dayjs | null;
  modifiedTs?: dayjs.Dayjs | null;
  customerLoan?: ICustomerLoan | null;
}

export const defaultValue: Readonly<IGuarantor> = {};
