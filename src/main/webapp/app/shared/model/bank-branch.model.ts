import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IBank } from 'app/shared/model/bank.model';

export interface IBankBranch {
  id?: number;
  branchName?: string;
  branchId?: string | null;
  branchLocation?: string | null;
  insertTs?: dayjs.Dayjs | null;
  modifiedTs?: dayjs.Dayjs | null;
  createdBy?: IUser | null;
  modifiedBy?: IUser | null;
  bank?: IBank | null;
}

export const defaultValue: Readonly<IBankBranch> = {};
