import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IPaymentPlan } from 'app/shared/model/payment-plan.model';

export interface IPaymentPlanItem {
  id?: number;
  amountPaid?: number;
  insertTs?: dayjs.Dayjs | null;
  modifiedTs?: dayjs.Dayjs | null;
  user?: IUser | null;
  paymentPlan?: IPaymentPlan | null;
}

export const defaultValue: Readonly<IPaymentPlanItem> = {};
