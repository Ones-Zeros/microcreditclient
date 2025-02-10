import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { PaymentType } from 'app/shared/model/enumerations/payment-type.model';

export interface ILoanTemplate {
  id?: number;
  templateId?: string;
  templateName?: string;
  amount?: number;
  paymentType?: keyof typeof PaymentType;
  interest?: number;
  intPercentage?: number;
  insertTs?: dayjs.Dayjs | null;
  modifiedTs?: dayjs.Dayjs | null;
  createdBy?: IUser | null;
  modifiedBy?: IUser | null;
}

export const defaultValue: Readonly<ILoanTemplate> = {};
