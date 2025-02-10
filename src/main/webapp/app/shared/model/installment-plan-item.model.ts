import dayjs from 'dayjs';
import { IInstallmentPlan } from 'app/shared/model/installment-plan.model';
import { PaymentStatus } from 'app/shared/model/enumerations/payment-status.model';

export interface IInstallmentPlanItem {
  id?: number;
  toBePaid?: dayjs.Dayjs | null;
  amount?: number | null;
  status?: keyof typeof PaymentStatus | null;
  insertTs?: dayjs.Dayjs | null;
  modifiedTs?: dayjs.Dayjs | null;
  installmentPlan?: IInstallmentPlan | null;
}

export const defaultValue: Readonly<IInstallmentPlanItem> = {};
