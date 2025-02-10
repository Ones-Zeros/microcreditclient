import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';

export interface ICollectorRoute {
  id?: number;
  routeId?: number;
  description?: string;
  insertTs?: dayjs.Dayjs | null;
  modifiedTs?: dayjs.Dayjs | null;
  createdBy?: IUser | null;
  modifiedBy?: IUser | null;
}

export const defaultValue: Readonly<ICollectorRoute> = {};
