import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IVehicleBrand } from 'app/shared/model/vehicle-brand.model';

export interface IVehicleModel {
  id?: number;
  model?: string;
  description?: string;
  insertTs?: dayjs.Dayjs | null;
  modifiedTs?: dayjs.Dayjs | null;
  createdBy?: IUser | null;
  modifiedBy?: IUser | null;
  vehicleBrand?: IVehicleBrand | null;
}

export const defaultValue: Readonly<IVehicleModel> = {};
