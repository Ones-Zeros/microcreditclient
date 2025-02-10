import dayjs from 'dayjs';
import { IInstallmentPlanItem } from 'app/shared/model/installment-plan-item.model';
import { IWeeklyCollection } from 'app/shared/model/weekly-collection.model';
import { IUser } from 'app/shared/model/user.model';

export interface IWeeklyCollectionItem {
  id?: number;
  amountToBePaid?: number;
  amountPaid?: number;
  note?: string | null;
  insertTs?: dayjs.Dayjs | null;
  modifiedTs?: dayjs.Dayjs | null;
  installmentPlanItem?: IInstallmentPlanItem | null;
  weeklyCollection?: IWeeklyCollection | null;
  createdBy?: IUser | null;
  updatedBy?: IUser | null;
}

export const defaultValue: Readonly<IWeeklyCollectionItem> = {};
