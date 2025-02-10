import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { createEntity, getEntity, reset, updateEntity } from './installment-plan.reducer';

export const InstallmentPlanUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const installmentPlanEntity = useAppSelector(state => state.installmentPlan.entity);
  const loading = useAppSelector(state => state.installmentPlan.loading);
  const updating = useAppSelector(state => state.installmentPlan.updating);
  const updateSuccess = useAppSelector(state => state.installmentPlan.updateSuccess);

  const handleClose = () => {
    navigate(`/installment-plan${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
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
      ...installmentPlanEntity,
      ...values,
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
          ...installmentPlanEntity,
          insertTs: convertDateTimeFromServer(installmentPlanEntity.insertTs),
          modifiedTs: convertDateTimeFromServer(installmentPlanEntity.modifiedTs),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="microcreditclientApp.installmentPlan.home.createOrEditLabel" data-cy="InstallmentPlanCreateUpdateHeading">
            <Translate contentKey="microcreditclientApp.installmentPlan.home.createOrEditLabel">Create or edit a InstallmentPlan</Translate>
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
                  id="installment-plan-id"
                  label={translate('microcreditclientApp.installmentPlan.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('microcreditclientApp.installmentPlan.installmentDate')}
                id="installment-plan-installmentDate"
                name="installmentDate"
                data-cy="installmentDate"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.installmentPlan.insertTs')}
                id="installment-plan-insertTs"
                name="insertTs"
                data-cy="insertTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('microcreditclientApp.installmentPlan.modifiedTs')}
                id="installment-plan-modifiedTs"
                name="modifiedTs"
                data-cy="modifiedTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/installment-plan" replace color="info">
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

export default InstallmentPlanUpdate;
