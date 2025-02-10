import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getCustomerLoans } from 'app/entities/customer-loan/customer-loan.reducer';
import { MortgageType } from 'app/shared/model/enumerations/mortgage-type.model';
import { createEntity, getEntity, reset, updateEntity } from './loan-mortgage.reducer';

export const LoanMortgageUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const customerLoans = useAppSelector(state => state.customerLoan.entities);
  const loanMortgageEntity = useAppSelector(state => state.loanMortgage.entity);
  const loading = useAppSelector(state => state.loanMortgage.loading);
  const updating = useAppSelector(state => state.loanMortgage.updating);
  const updateSuccess = useAppSelector(state => state.loanMortgage.updateSuccess);
  const mortgageTypeValues = Object.keys(MortgageType);

  const handleClose = () => {
    navigate(`/loan-mortgage${location.search}`);
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
      ...loanMortgageEntity,
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
          type: 'VEHICLE',
          ...loanMortgageEntity,
          insertTs: convertDateTimeFromServer(loanMortgageEntity.insertTs),
          modifiedTs: convertDateTimeFromServer(loanMortgageEntity.modifiedTs),
          customerLoan: loanMortgageEntity?.customerLoan?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="microcreditclientApp.loanMortgage.home.createOrEditLabel" data-cy="LoanMortgageCreateUpdateHeading">
            <Translate contentKey="microcreditclientApp.loanMortgage.home.createOrEditLabel">Create or edit a LoanMortgage</Translate>
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
                  id="loan-mortgage-id"
                  label={translate('microcreditclientApp.loanMortgage.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('microcreditclientApp.loanMortgage.loanId')}
                id="loan-mortgage-loanId"
                name="loanId"
                data-cy="loanId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.loanMortgage.type')}
                id="loan-mortgage-type"
                name="type"
                data-cy="type"
                type="select"
              >
                {mortgageTypeValues.map(mortgageType => (
                  <option value={mortgageType} key={mortgageType}>
                    {translate(`microcreditclientApp.MortgageType.${mortgageType}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('microcreditclientApp.loanMortgage.insertTs')}
                id="loan-mortgage-insertTs"
                name="insertTs"
                data-cy="insertTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('microcreditclientApp.loanMortgage.modifiedTs')}
                id="loan-mortgage-modifiedTs"
                name="modifiedTs"
                data-cy="modifiedTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="loan-mortgage-customerLoan"
                name="customerLoan"
                data-cy="customerLoan"
                label={translate('microcreditclientApp.loanMortgage.customerLoan')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/loan-mortgage" replace color="info">
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

export default LoanMortgageUpdate;
