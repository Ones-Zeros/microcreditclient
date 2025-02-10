import dayjs from 'dayjs';

export interface IInstallmentPlan {
  id?: number;
  installmentDate?: dayjs.Dayjs;
  insertTs?: dayjs.Dayjs | null;
  modifiedTs?: dayjs.Dayjs | null;
}

export const defaultValue: Readonly<IInstallmentPlan> = {};
