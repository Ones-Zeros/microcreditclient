import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntities as getVehicleBrands } from 'app/entities/vehicle-brand/vehicle-brand.reducer';
import { createEntity, getEntity, reset, updateEntity } from './vehicle-model.reducer';
import { Box, Typography } from '@mui/material';
import CancelButton from 'app/shared/Components/CancelButton';
import SaveButton from 'app/shared/Components/SaveButton';

export const VehicleModelUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;
  const [mode, setMode] = useState('');
  const users = useAppSelector(state => state.userManagement.users);
  const vehicleBrands = useAppSelector(state => state.vehicleBrand.entities);
  const vehicleModelEntity = useAppSelector(state => state.vehicleModel.entity);
  const loading = useAppSelector(state => state.vehicleModel.loading);
  const updating = useAppSelector(state => state.vehicleModel.updating);
  const updateSuccess = useAppSelector(state => state.vehicleModel.updateSuccess);
  const brandId = useAppSelector(state => state.vehicleBrand.entity.id);
  const handleClose = () => {
    navigate(`/vehicle-brand/${brandId}/edit`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
    dispatch(getVehicleBrands({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.insertTs = convertDateTimeToServer(values.insertTs);
    values.modifiedTs = convertDateTimeToServer(values.modifiedTs);

    const entity = {
      ...vehicleModelEntity,
      ...values,
      brand: { id: brandId },
      createdBy: users.find(it => it.id.toString() === values.createdBy?.toString()),
      modifiedBy: users.find(it => it.id.toString() === values.modifiedBy?.toString()),
      vehicleBrand: vehicleBrands.find(it => it.id.toString() === values.vehicleBrand?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  useEffect(() => {
    if (location.pathname.includes('/edit')) {
      setMode('edit');
    } else if (location.pathname.includes('/new')) {
      setMode('new');
    } else {
      setMode('view');
    }
  }, [location.pathname]);
  const defaultValues = () =>
    isNew
      ? {
          insertTs: displayDefaultDateTime(),
          modifiedTs: displayDefaultDateTime(),
          vehicleBrand: brandId,
        }
      : {
          ...vehicleModelEntity,
          insertTs: convertDateTimeFromServer(vehicleModelEntity.insertTs),
          modifiedTs: convertDateTimeFromServer(vehicleModelEntity.modifiedTs),
          createdBy: vehicleModelEntity?.createdBy?.id,
          modifiedBy: vehicleModelEntity?.modifiedBy?.id,
          vehicleBrand: vehicleModelEntity?.vehicleBrand?.id || brandId,
        };

  return (
    <Box m="20px">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h3" fontWeight="bold" sx={{ fontSize: '18px', paddingTop: '0px', paddingLeft: '20px', marginBottom: '10px' }}>
          {mode === 'new' ? 'Add VehicleModel' : mode === 'edit' ? 'Edit VehicleModel' : 'View VehicleModel'}
        </Typography>
      </div>
      <hr></hr>
      <div>
        <Box
          sx={{
            backgroundColor: 'white', // White background
            borderRadius: '10px', // Rounded corners
            padding: '5px', // Padding to create space between border and content
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Optional: Adds a subtle shadow for depth
            marginTop: '10px', // Adds space between this box and the previous element
            marginLeft: '20px', // Adds space between this box and the left edge of the screen
          }}
        >
          <Row className="justify-content-start mt-3">
            <Col md="12">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ValidatedForm className="row" defaultValues={defaultValues()} onSubmit={saveEntity}>
                  {!isNew ? (
                    <ValidatedField
                      row
                      className="col-md-3"
                      name="id"
                      required
                      readOnly
                      id="vehicle-model-id"
                      label={translate('microcreditclientApp.vehicleModel.id')}
                      validate={{ required: true }}
                    />
                  ) : null}
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.vehicleModel.model')}
                    id="vehicle-model-model"
                    name="model"
                    data-cy="model"
                    type="text"
                    validate={{
                      required: { value: true, message: translate('entity.validation.required') },
                    }}
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.vehicleModel.description')}
                    id="vehicle-model-description"
                    name="description"
                    data-cy="description"
                    type="text"
                    validate={{
                      required: { value: true, message: translate('entity.validation.required') },
                    }}
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.vehicleModel.insertTs')}
                    id="vehicle-model-insertTs"
                    name="insertTs"
                    data-cy="insertTs"
                    type="datetime-local"
                    placeholder="YYYY-MM-DD HH:mm"
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.vehicleModel.modifiedTs')}
                    id="vehicle-model-modifiedTs"
                    name="modifiedTs"
                    data-cy="modifiedTs"
                    type="datetime-local"
                    placeholder="YYYY-MM-DD HH:mm"
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    id="vehicle-model-createdBy"
                    name="createdBy"
                    data-cy="createdBy"
                    label={translate('microcreditclientApp.vehicleModel.createdBy')}
                    type="select"
                  >
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </ValidatedField>
                  <ValidatedField
                    row
                    className="col-md-3"
                    id="vehicle-model-modifiedBy"
                    name="modifiedBy"
                    data-cy="modifiedBy"
                    label={translate('microcreditclientApp.vehicleModel.modifiedBy')}
                    type="select"
                  >
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </ValidatedField>
                  <Row className="justify-content-end" style={{ marginTop: '30px' }}>
                    <Col md={12} className="d-flex justify-content-end">
                      {mode === 'new' || mode === 'view' || mode === 'edit' ? <CancelButton to={`/vehicle-brand/${brandId}/edit`} /> : null}
                      &nbsp;
                      {!(mode !== 'edit' && mode !== 'new') || mode === 'new' || mode === 'edit' ? (
                        <SaveButton updating={updating} />
                      ) : null}
                    </Col>
                  </Row>
                </ValidatedForm>
              )}
            </Col>
          </Row>
        </Box>
      </div>
    </Box>
  );
};

export default VehicleModelUpdate;
