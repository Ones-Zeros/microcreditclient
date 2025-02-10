import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getVehicleModels } from 'app/entities/vehicle-model/vehicle-model.reducer';
import { createEntity, getEntity, reset, updateEntity } from './vehicle-valuation-report.reducer';

export const VehicleValuationReportUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const vehicleModels = useAppSelector(state => state.vehicleModel.entities);
  const vehicleValuationReportEntity = useAppSelector(state => state.vehicleValuationReport.entity);
  const loading = useAppSelector(state => state.vehicleValuationReport.loading);
  const updating = useAppSelector(state => state.vehicleValuationReport.updating);
  const updateSuccess = useAppSelector(state => state.vehicleValuationReport.updateSuccess);

  const handleClose = () => {
    navigate(`/vehicle-valuation-report${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getVehicleModels({}));
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
    if (values.engineCapacity !== undefined && typeof values.engineCapacity !== 'number') {
      values.engineCapacity = Number(values.engineCapacity);
    }
    values.insertTs = convertDateTimeToServer(values.insertTs);
    values.modifiedTs = convertDateTimeToServer(values.modifiedTs);

    const entity = {
      ...vehicleValuationReportEntity,
      ...values,
      vehicleModel: vehicleModels.find(it => it.id.toString() === values.vehicleModel?.toString()),
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
        }
      : {
          ...vehicleValuationReportEntity,
          insertTs: convertDateTimeFromServer(vehicleValuationReportEntity.insertTs),
          modifiedTs: convertDateTimeFromServer(vehicleValuationReportEntity.modifiedTs),
          vehicleModel: vehicleValuationReportEntity?.vehicleModel?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="microcreditclientApp.vehicleValuationReport.home.createOrEditLabel" data-cy="VehicleValuationReportCreateUpdateHeading">
            <Translate contentKey="microcreditclientApp.vehicleValuationReport.home.createOrEditLabel">
              Create or edit a VehicleValuationReport
            </Translate>
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
                  id="vehicle-valuation-report-id"
                  label={translate('microcreditclientApp.vehicleValuationReport.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('microcreditclientApp.vehicleValuationReport.vehicleNo')}
                id="vehicle-valuation-report-vehicleNo"
                name="vehicleNo"
                data-cy="vehicleNo"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.vehicleValuationReport.chassisNumber')}
                id="vehicle-valuation-report-chassisNumber"
                name="chassisNumber"
                data-cy="chassisNumber"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.vehicleValuationReport.engineId')}
                id="vehicle-valuation-report-engineId"
                name="engineId"
                data-cy="engineId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.vehicleValuationReport.engineCapacity')}
                id="vehicle-valuation-report-engineCapacity"
                name="engineCapacity"
                data-cy="engineCapacity"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.vehicleValuationReport.imgUrl1')}
                id="vehicle-valuation-report-imgUrl1"
                name="imgUrl1"
                data-cy="imgUrl1"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.vehicleValuationReport.imgUrl2')}
                id="vehicle-valuation-report-imgUrl2"
                name="imgUrl2"
                data-cy="imgUrl2"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.vehicleValuationReport.imgUrl3')}
                id="vehicle-valuation-report-imgUrl3"
                name="imgUrl3"
                data-cy="imgUrl3"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.vehicleValuationReport.imgUrl4')}
                id="vehicle-valuation-report-imgUrl4"
                name="imgUrl4"
                data-cy="imgUrl4"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.vehicleValuationReport.imgUrl5')}
                id="vehicle-valuation-report-imgUrl5"
                name="imgUrl5"
                data-cy="imgUrl5"
                type="text"
              />
              <ValidatedField
                label={translate('microcreditclientApp.vehicleValuationReport.imgUrl6')}
                id="vehicle-valuation-report-imgUrl6"
                name="imgUrl6"
                data-cy="imgUrl6"
                type="text"
              />
              <ValidatedField
                label={translate('microcreditclientApp.vehicleValuationReport.insertTs')}
                id="vehicle-valuation-report-insertTs"
                name="insertTs"
                data-cy="insertTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('microcreditclientApp.vehicleValuationReport.modifiedTs')}
                id="vehicle-valuation-report-modifiedTs"
                name="modifiedTs"
                data-cy="modifiedTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="vehicle-valuation-report-vehicleModel"
                name="vehicleModel"
                data-cy="vehicleModel"
                label={translate('microcreditclientApp.vehicleValuationReport.vehicleModel')}
                type="select"
              >
                <option value="" key="0" />
                {vehicleModels
                  ? vehicleModels.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/vehicle-valuation-report" replace color="info">
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

export default VehicleValuationReportUpdate;
