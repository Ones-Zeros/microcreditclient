import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { PaymentType } from 'app/shared/model/enumerations/payment-type.model';
import { createEntity, getEntity, reset, updateEntity } from './loan-template.reducer';

export const LoanTemplateUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const loanTemplateEntity = useAppSelector(state => state.loanTemplate.entity);
  const loading = useAppSelector(state => state.loanTemplate.loading);
  const updating = useAppSelector(state => state.loanTemplate.updating);
  const updateSuccess = useAppSelector(state => state.loanTemplate.updateSuccess);
  const paymentTypeValues = Object.keys(PaymentType);

  const handleClose = () => {
    navigate(`/loan-template${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
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
    if (values.interest !== undefined && typeof values.interest !== 'number') {
      values.interest = Number(values.interest);
    }
    if (values.intPercentage !== undefined && typeof values.intPercentage !== 'number') {
      values.intPercentage = Number(values.intPercentage);
    }
    values.insertTs = convertDateTimeToServer(values.insertTs);
    values.modifiedTs = convertDateTimeToServer(values.modifiedTs);

    const entity = {
      ...loanTemplateEntity,
      ...values,
      createdBy: users.find(it => it.id.toString() === values.createdBy?.toString()),
      modifiedBy: users.find(it => it.id.toString() === values.modifiedBy?.toString()),
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
          paymentType: 'DAILY',
          ...loanTemplateEntity,
          insertTs: convertDateTimeFromServer(loanTemplateEntity.insertTs),
          modifiedTs: convertDateTimeFromServer(loanTemplateEntity.modifiedTs),
          createdBy: loanTemplateEntity?.createdBy?.id,
          modifiedBy: loanTemplateEntity?.modifiedBy?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="microcreditclientApp.loanTemplate.home.createOrEditLabel" data-cy="LoanTemplateCreateUpdateHeading">
            <Translate contentKey="microcreditclientApp.loanTemplate.home.createOrEditLabel">Create or edit a LoanTemplate</Translate>
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
                  id="loan-template-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('microcreditclientApp.loanTemplate.templateId')}
                id="loan-template-templateId"
                name="templateId"
                data-cy="templateId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.loanTemplate.templateName')}
                id="loan-template-templateName"
                name="templateName"
                data-cy="templateName"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.loanTemplate.amount')}
                id="loan-template-amount"
                name="amount"
                data-cy="amount"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.loanTemplate.paymentType')}
                id="loan-template-paymentType"
                name="paymentType"
                data-cy="paymentType"
                type="select"
              >
                {paymentTypeValues.map(paymentType => (
                  <option value={paymentType} key={paymentType}>
                    {translate(`microcreditclientApp.PaymentType.${paymentType}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('microcreditclientApp.loanTemplate.interest')}
                id="loan-template-interest"
                name="interest"
                data-cy="interest"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.loanTemplate.intPercentage')}
                id="loan-template-intPercentage"
                name="intPercentage"
                data-cy="intPercentage"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.loanTemplate.insertTs')}
                id="loan-template-insertTs"
                name="insertTs"
                data-cy="insertTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('microcreditclientApp.loanTemplate.modifiedTs')}
                id="loan-template-modifiedTs"
                name="modifiedTs"
                data-cy="modifiedTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="loan-template-createdBy"
                name="createdBy"
                data-cy="createdBy"
                label={translate('microcreditclientApp.loanTemplate.createdBy')}
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
                id="loan-template-modifiedBy"
                name="modifiedBy"
                data-cy="modifiedBy"
                label={translate('microcreditclientApp.loanTemplate.modifiedBy')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/loan-template" replace color="info">
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

export default LoanTemplateUpdate;
