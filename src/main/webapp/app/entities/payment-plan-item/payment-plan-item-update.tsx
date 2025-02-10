import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntities as getPaymentPlans } from 'app/entities/payment-plan/payment-plan.reducer';
import { createEntity, getEntity, reset, updateEntity } from './payment-plan-item.reducer';

export const PaymentPlanItemUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const paymentPlans = useAppSelector(state => state.paymentPlan.entities);
  const paymentPlanItemEntity = useAppSelector(state => state.paymentPlanItem.entity);
  const loading = useAppSelector(state => state.paymentPlanItem.loading);
  const updating = useAppSelector(state => state.paymentPlanItem.updating);
  const updateSuccess = useAppSelector(state => state.paymentPlanItem.updateSuccess);

  const handleClose = () => {
    navigate(`/payment-plan-item${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
    dispatch(getPaymentPlans({}));
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
    if (values.amountPaid !== undefined && typeof values.amountPaid !== 'number') {
      values.amountPaid = Number(values.amountPaid);
    }
    values.insertTs = convertDateTimeToServer(values.insertTs);
    values.modifiedTs = convertDateTimeToServer(values.modifiedTs);

    const entity = {
      ...paymentPlanItemEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user?.toString()),
      paymentPlan: paymentPlans.find(it => it.id.toString() === values.paymentPlan?.toString()),
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
          ...paymentPlanItemEntity,
          insertTs: convertDateTimeFromServer(paymentPlanItemEntity.insertTs),
          modifiedTs: convertDateTimeFromServer(paymentPlanItemEntity.modifiedTs),
          user: paymentPlanItemEntity?.user?.id,
          paymentPlan: paymentPlanItemEntity?.paymentPlan?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="microcreditclientApp.paymentPlanItem.home.createOrEditLabel" data-cy="PaymentPlanItemCreateUpdateHeading">
            <Translate contentKey="microcreditclientApp.paymentPlanItem.home.createOrEditLabel">Create or edit a PaymentPlanItem</Translate>
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
                  id="payment-plan-item-id"
                  label={translate('microcreditclientApp.paymentPlanItem.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('microcreditclientApp.paymentPlanItem.amountPaid')}
                id="payment-plan-item-amountPaid"
                name="amountPaid"
                data-cy="amountPaid"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.paymentPlanItem.insertTs')}
                id="payment-plan-item-insertTs"
                name="insertTs"
                data-cy="insertTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('microcreditclientApp.paymentPlanItem.modifiedTs')}
                id="payment-plan-item-modifiedTs"
                name="modifiedTs"
                data-cy="modifiedTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="payment-plan-item-user"
                name="user"
                data-cy="user"
                label={translate('microcreditclientApp.paymentPlanItem.user')}
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
                id="payment-plan-item-paymentPlan"
                name="paymentPlan"
                data-cy="paymentPlan"
                label={translate('microcreditclientApp.paymentPlanItem.paymentPlan')}
                type="select"
              >
                <option value="" key="0" />
                {paymentPlans
                  ? paymentPlans.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/payment-plan-item" replace color="info">
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

export default PaymentPlanItemUpdate;
