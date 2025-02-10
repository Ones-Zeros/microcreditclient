import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { ICollectorRoute } from 'app/shared/model/collector-route.model';
import { IWeeklyCollection } from 'app/shared/model/weekly-collection.model';

export interface ICollectorCollectionRoute {
  id?: number;
  routeId?: number;
  collectorId?: number;
  startDate?: dayjs.Dayjs;
  endDate?: dayjs.Dayjs | null;
  insertTs?: dayjs.Dayjs | null;
  modifiedTs?: dayjs.Dayjs | null;
  user?: IUser | null;
  collectorRoute?: ICollectorRoute | null;
  weeklyCollection?: IWeeklyCollection | null;
}

export const defaultValue: Readonly<ICollectorCollectionRoute> = {};
