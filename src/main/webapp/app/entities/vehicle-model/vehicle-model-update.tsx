import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntities as getVehicleBrands } from 'app/entities/vehicle-brand/vehicle-brand.reducer';
import { createEntity, getEntity, reset, updateEntity } from './vehicle-model.reducer';

export const VehicleModelUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

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
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="microcreditclientApp.vehicleModel.home.createOrEditLabel" data-cy="VehicleModelCreateUpdateHeading">
            <Translate contentKey="microcreditclientApp.vehicleModel.home.createOrEditLabel">Create or edit a VehicleModel</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="vehicle-model-id"
                  label={translate('microcreditclientApp.vehicleModel.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
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
                label={translate('microcreditclientApp.vehicleModel.insertTs')}
                id="vehicle-model-insertTs"
                name="insertTs"
                data-cy="insertTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('microcreditclientApp.vehicleModel.modifiedTs')}
                id="vehicle-model-modifiedTs"
                name="modifiedTs"
                data-cy="modifiedTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
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
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to={`/vehicle-brand/${brandId}/edit`}
                replace
                color="info"
              >
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default VehicleModelUpdate;
