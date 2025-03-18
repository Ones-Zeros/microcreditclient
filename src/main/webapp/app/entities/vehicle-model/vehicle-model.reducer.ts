import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { cleanEntity } from 'app/shared/util/entity-utils';
import { EntityState, IIdQueryParams, IQueryParams, createEntitySlice, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IVehicleModel, defaultValue } from 'app/shared/model/vehicle-model.model';

const initialState: EntityState<IVehicleModel> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/vehicle-models';
const apiSearchUrl = 'api/vehicle-models/_search';

// Actions

export const searchEntities = createAsyncThunk(
  'vehicleModel/search_entity',
  async ({ query, page, size, sort }: IQueryParams) => {
    const requestUrl = `${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`;
    return axios.get<IVehicleModel[]>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

export const getEntities = createAsyncThunk(
  'vehicleModel/fetch_entity_list',
  async ({ id, page, size, sort }: IIdQueryParams) => {
    const requestUrl = `${apiUrl}?${sort ? `page=${page}&size=${size}&sort=${sort}&` : ''}cacheBuster=${new Date().getTime()}`;
    return axios.get<IVehicleModel[]>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

export const getEntity = createAsyncThunk(
  'vehicleModel/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IVehicleModel>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

export const createEntity = createAsyncThunk(
  'vehicleModel/create_entity',
  async (entity: IVehicleModel, thunkAPI) => {
    const result = await axios.post<IVehicleModel>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const updateEntity = createAsyncThunk(
  'vehicleModel/update_entity',
  async (entity: IVehicleModel, thunkAPI) => {
    const result = await axios.put<IVehicleModel>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const partialUpdateEntity = createAsyncThunk(
  'vehicleModel/partial_update_entity',
  async (entity: IVehicleModel, thunkAPI) => {
    const result = await axios.patch<IVehicleModel>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const getEntitiesByBrand = createAsyncThunk(
  'brand/fetch_entity_list_by_brand',
  async ({ id, page, size, sort }: { id: number; page: number; size: number; sort: string }) => {
    const requestUrl = `/api/vehicle-models/by-brand/${id}${
      sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'
    }cacheBuster=${new Date().getTime()}`;

    return axios.get<IVehicleModel[]>(requestUrl);
  },
);
export const deleteEntity = createAsyncThunk(
  'vehicleModel/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IVehicleModel>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const createEntityByVehicleBrand = createAsyncThunk(
  'vehicleModel/create_entity_by_vehicle_brand',
  async (entity: IVehicleModel, thunkAPI) => {
    const result = await axios.post<IVehicleModel>(`${apiUrl}`, cleanEntity(entity));
    // Dispatch createEntityByTravelRequest with the TR ID from the entity
    thunkAPI.dispatch(
      getEntities({
        id: entity.vehicleBrand.id || 0,
        page: 0, // Default page
        size: 20, // Default size
        sort: 'id', // Default sort
      }),
    );
    return result;
  },
  { serializeError: serializeAxiosError },
);

// slice

export const VehicleModelSlice = createEntitySlice({
  name: 'vehicleModel',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntitiesByBrand.fulfilled, (state, action) => {
        const { data, headers } = action.payload;
        state.loading = false;
        state.entities = data;
        state.totalItems = parseInt(headers['x-total-count'], 10);
      })
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(deleteEntity.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = {};
      })
      .addMatcher(isFulfilled(getEntities, searchEntities), (state, action) => {
        const { data, headers } = action.payload;

        return {
          ...state,
          loading: false,
          entities: data,
          totalItems: parseInt(headers['x-total-count'], 10),
        };
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending(getEntities, getEntity, searchEntities), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = VehicleModelSlice.actions;

// Reducer
export default VehicleModelSlice.reducer;
