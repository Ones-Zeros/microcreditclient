import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getCustomerLoans } from 'app/entities/customer-loan/customer-loan.reducer';
import { createEntity, getEntity, reset, updateEntity } from './payment-plan.reducer';

export const PaymentPlanUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const customerLoans = useAppSelector(state => state.customerLoan.entities);
  const paymentPlanEntity = useAppSelector(state => state.paymentPlan.entity);
  const loading = useAppSelector(state => state.paymentPlan.loading);
  const updating = useAppSelector(state => state.paymentPlan.updating);
  const updateSuccess = useAppSelector(state => state.paymentPlan.updateSuccess);

  const handleClose = () => {
    navigate(`/payment-plan${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCustomerLoans({}));
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
    if (values.loanId !== undefined && typeof values.loanId !== 'number') {
      values.loanId = Number(values.loanId);
    }
    values.insertTs = convertDateTimeToServer(values.insertTs);
    values.modifiedTs = convertDateTimeToServer(values.modifiedTs);

    const entity = {
      ...paymentPlanEntity,
      ...values,
      customerLoan: customerLoans.find(it => it.id.toString() === values.customerLoan?.toString()),
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
          ...paymentPlanEntity,
          insertTs: convertDateTimeFromServer(paymentPlanEntity.insertTs),
          modifiedTs: convertDateTimeFromServer(paymentPlanEntity.modifiedTs),
          customerLoan: paymentPlanEntity?.customerLoan?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="microcreditclientApp.paymentPlan.home.createOrEditLabel" data-cy="PaymentPlanCreateUpdateHeading">
            <Translate contentKey="microcreditclientApp.paymentPlan.home.createOrEditLabel">Create or edit a PaymentPlan</Translate>
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
                  id="payment-plan-id"
                  label={translate('microcreditclientApp.paymentPlan.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('microcreditclientApp.paymentPlan.loanId')}
                id="payment-plan-loanId"
                name="loanId"
                data-cy="loanId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.paymentPlan.insertTs')}
                id="payment-plan-insertTs"
                name="insertTs"
                data-cy="insertTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('microcreditclientApp.paymentPlan.modifiedTs')}
                id="payment-plan-modifiedTs"
                name="modifiedTs"
                data-cy="modifiedTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="payment-plan-customerLoan"
                name="customerLoan"
                data-cy="customerLoan"
                label={translate('microcreditclientApp.paymentPlan.customerLoan')}
                type="select"
              >
                <option value="" key="0" />
                {customerLoans
                  ? customerLoans.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/payment-plan" replace color="info">
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

export default PaymentPlanUpdate;
