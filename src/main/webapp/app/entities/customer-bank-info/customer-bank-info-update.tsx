import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getBankBranches } from 'app/entities/bank-branch/bank-branch.reducer';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { createEntity, getEntity, reset, updateEntity } from './customer-bank-info.reducer';

export const CustomerBankInfoUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const bankBranches = useAppSelector(state => state.bankBranch.entities);
  const customers = useAppSelector(state => state.customer.entities);
  const customerBankInfoEntity = useAppSelector(state => state.customerBankInfo.entity);
  const loading = useAppSelector(state => state.customerBankInfo.loading);
  const updating = useAppSelector(state => state.customerBankInfo.updating);
  const updateSuccess = useAppSelector(state => state.customerBankInfo.updateSuccess);

  const handleClose = () => {
    navigate(`/customer-bank-info${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getBankBranches({}));
    dispatch(getCustomers({}));
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
      ...customerBankInfoEntity,
      ...values,
      bankBranch: bankBranches.find(it => it.id.toString() === values.bankBranch?.toString()),
      customer: customers.find(it => it.id.toString() === values.customer?.toString()),
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
          ...customerBankInfoEntity,
          insertTs: convertDateTimeFromServer(customerBankInfoEntity.insertTs),
          modifiedTs: convertDateTimeFromServer(customerBankInfoEntity.modifiedTs),
          bankBranch: customerBankInfoEntity?.bankBranch?.id,
          customer: customerBankInfoEntity?.customer?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="microcreditclientApp.customerBankInfo.home.createOrEditLabel" data-cy="CustomerBankInfoCreateUpdateHeading">
            <Translate contentKey="microcreditclientApp.customerBankInfo.home.createOrEditLabel">
              Create or edit a CustomerBankInfo
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
                  id="customer-bank-info-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('microcreditclientApp.customerBankInfo.accountNumber')}
                id="customer-bank-info-accountNumber"
                name="accountNumber"
                data-cy="accountNumber"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.customerBankInfo.insertTs')}
                id="customer-bank-info-insertTs"
                name="insertTs"
                data-cy="insertTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('microcreditclientApp.customerBankInfo.modifiedTs')}
                id="customer-bank-info-modifiedTs"
                name="modifiedTs"
                data-cy="modifiedTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="customer-bank-info-bankBranch"
                name="bankBranch"
                data-cy="bankBranch"
                label={translate('microcreditclientApp.customerBankInfo.bankBranch')}
                type="select"
              >
                <option value="" key="0" />
                {bankBranches
                  ? bankBranches.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="customer-bank-info-customer"
                name="customer"
                data-cy="customer"
                label={translate('microcreditclientApp.customerBankInfo.customer')}
                type="select"
              >
                <option value="" key="0" />
                {customers
                  ? customers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/customer-bank-info" replace color="info">
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

export default CustomerBankInfoUpdate;
