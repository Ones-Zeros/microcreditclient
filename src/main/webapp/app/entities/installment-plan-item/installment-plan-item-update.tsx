import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getInstallmentPlans } from 'app/entities/installment-plan/installment-plan.reducer';
import { PaymentStatus } from 'app/shared/model/enumerations/payment-status.model';
import { createEntity, getEntity, reset, updateEntity } from './installment-plan-item.reducer';

export const InstallmentPlanItemUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const installmentPlans = useAppSelector(state => state.installmentPlan.entities);
  const installmentPlanItemEntity = useAppSelector(state => state.installmentPlanItem.entity);
  const loading = useAppSelector(state => state.installmentPlanItem.loading);
  const updating = useAppSelector(state => state.installmentPlanItem.updating);
  const updateSuccess = useAppSelector(state => state.installmentPlanItem.updateSuccess);
  const paymentStatusValues = Object.keys(PaymentStatus);

  const handleClose = () => {
    navigate(`/installment-plan-item${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getInstallmentPlans({}));
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
    if (values.amount !== undefined && typeof values.amount !== 'number') {
      values.amount = Number(values.amount);
    }
    values.insertTs = convertDateTimeToServer(values.insertTs);
    values.modifiedTs = convertDateTimeToServer(values.modifiedTs);

    const entity = {
      ...installmentPlanItemEntity,
      ...values,
      installmentPlan: installmentPlans.find(it => it.id.toString() === values.installmentPlan?.toString()),
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
          status: 'NOT_PAID',
          ...installmentPlanItemEntity,
          insertTs: convertDateTimeFromServer(installmentPlanItemEntity.insertTs),
          modifiedTs: convertDateTimeFromServer(installmentPlanItemEntity.modifiedTs),
          installmentPlan: installmentPlanItemEntity?.installmentPlan?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="microcreditclientApp.installmentPlanItem.home.createOrEditLabel" data-cy="InstallmentPlanItemCreateUpdateHeading">
            <Translate contentKey="microcreditclientApp.installmentPlanItem.home.createOrEditLabel">
              Create or edit a InstallmentPlanItem
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
                  id="installment-plan-item-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('microcreditclientApp.installmentPlanItem.toBePaid')}
                id="installment-plan-item-toBePaid"
                name="toBePaid"
                data-cy="toBePaid"
                type="date"
              />
              <ValidatedField
                label={translate('microcreditclientApp.installmentPlanItem.amount')}
                id="installment-plan-item-amount"
                name="amount"
                data-cy="amount"
                type="text"
              />
              <ValidatedField
                label={translate('microcreditclientApp.installmentPlanItem.status')}
                id="installment-plan-item-status"
                name="status"
                data-cy="status"
                type="select"
              >
                {paymentStatusValues.map(paymentStatus => (
                  <option value={paymentStatus} key={paymentStatus}>
                    {translate(`microcreditclientApp.PaymentStatus.${paymentStatus}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('microcreditclientApp.installmentPlanItem.insertTs')}
                id="installment-plan-item-insertTs"
                name="insertTs"
                data-cy="insertTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('microcreditclientApp.installmentPlanItem.modifiedTs')}
                id="installment-plan-item-modifiedTs"
                name="modifiedTs"
                data-cy="modifiedTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="installment-plan-item-installmentPlan"
                name="installmentPlan"
                data-cy="installmentPlan"
                label={translate('microcreditclientApp.installmentPlanItem.installmentPlan')}
                type="select"
              >
                <option value="" key="0" />
                {installmentPlans
                  ? installmentPlans.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/installment-plan-item" replace color="info">
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

export default InstallmentPlanItemUpdate;
