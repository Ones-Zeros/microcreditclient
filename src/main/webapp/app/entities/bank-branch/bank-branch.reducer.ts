import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { cleanEntity } from 'app/shared/util/entity-utils';
import { EntityState, IIdQueryParams, IQueryParams, createEntitySlice, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IBankBranch, defaultValue } from 'app/shared/model/bank-branch.model';

const initialState: EntityState<IBankBranch> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/bank-branches';
const apiSearchUrl = 'api/bank-branches/_search';

// Actions

export const searchEntities = createAsyncThunk(
  'bankBranch/search_entity',
  async ({ query, page, size, sort }: IQueryParams) => {
    const requestUrl = `${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`;
    return axios.get<IBankBranch[]>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

export const getEntities = createAsyncThunk(
  'bankBranch/fetch_entity_list',
  async ({ page, size, sort }: IQueryParams) => {
    const requestUrl = `${apiUrl}?${sort ? `page=${page}&size=${size}&sort=${sort}&` : ''}cacheBuster=${new Date().getTime()}`;
    return axios.get<IBankBranch[]>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);
export const getEntitiesByBank = createAsyncThunk(
  'bankBranch/fetch_entity_list_by_bank',
  async ({ id, page, size, sort }: { id: number; page: number; size: number; sort: string }) => {
    const requestUrl = `api/bank-branches/by-bank/${id}${
      sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'
    }cacheBuster=${new Date().getTime()}`;

    return axios.get<IBankBranch[]>(requestUrl);
  },
);

export const getEntity = createAsyncThunk(
  'bankBranch/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IBankBranch>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

export const createEntity = createAsyncThunk(
  'bankBranch/create_entity',
  async (entity: IBankBranch, thunkAPI) => {
    const result = await axios.post<IBankBranch>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const updateEntity = createAsyncThunk(
  'bankBranch/update_entity',
  async (entity: IBankBranch, thunkAPI) => {
    const result = await axios.put<IBankBranch>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const partialUpdateEntity = createAsyncThunk(
  'bankBranch/partial_update_entity',
  async (entity: IBankBranch, thunkAPI) => {
    const result = await axios.patch<IBankBranch>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const deleteEntity = createAsyncThunk(
  'bankBranch/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IBankBranch>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

// slice
export const BankBranchSlice = createEntitySlice({
  name: 'bankBranch',
  initialState,
  extraReducers(builder) {
    builder
      // Handle the fulfilled state of fetching bank branches by bankId
      .addCase(getEntitiesByBank.fulfilled, (state, action) => {
        const { data, headers } = action.payload;
        state.loading = false;
        state.entities = data;
        state.totalItems = parseInt(headers['x-total-count'], 10);
      })
      // Handle other cases
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addMatcher(isFulfilled(getEntities, searchEntities), (state, action) => {
        const { data, headers } = action.payload;
        state.loading = false;
        state.entities = data;
        state.totalItems = parseInt(headers['x-total-count'], 10);
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

export const { reset } = BankBranchSlice.actions;

// Reducer
export default BankBranchSlice.reducer;
