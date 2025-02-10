import dayjs from 'dayjs';
import { IVehicleModel } from 'app/shared/model/vehicle-model.model';

export interface IVehicleValuationReport {
  id?: number;
  vehicleNo?: string;
  chassisNumber?: string;
  engineId?: string;
  engineCapacity?: number;
  imgUrl1?: string;
  imgUrl2?: string;
  imgUrl3?: string;
  imgUrl4?: string;
  imgUrl5?: string | null;
  imgUrl6?: string | null;
  insertTs?: dayjs.Dayjs | null;
  modifiedTs?: dayjs.Dayjs | null;
  vehicleModel?: IVehicleModel | null;
}

export const defaultValue: Readonly<IVehicleValuationReport> = {};
