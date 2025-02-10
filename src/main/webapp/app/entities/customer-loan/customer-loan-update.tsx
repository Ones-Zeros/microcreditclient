import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getVehicleValuationReports } from 'app/entities/vehicle-valuation-report/vehicle-valuation-report.reducer';
import { getEntities as getInstallmentPlans } from 'app/entities/installment-plan/installment-plan.reducer';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntities as getLoanTemplates } from 'app/entities/loan-template/loan-template.reducer';
import { PaymentType } from 'app/shared/model/enumerations/payment-type.model';
import { LoanStatus } from 'app/shared/model/enumerations/loan-status.model';
import { createEntity, getEntity, reset, updateEntity } from './customer-loan.reducer';

export const CustomerLoanUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const vehicleValuationReports = useAppSelector(state => state.vehicleValuationReport.entities);
  const installmentPlans = useAppSelector(state => state.installmentPlan.entities);
  const users = useAppSelector(state => state.userManagement.users);
  const customers = useAppSelector(state => state.customer.entities);
  const loanTemplates = useAppSelector(state => state.loanTemplate.entities);
  const customerLoanEntity = useAppSelector(state => state.customerLoan.entity);
  const loading = useAppSelector(state => state.customerLoan.loading);
  const updating = useAppSelector(state => state.customerLoan.updating);
  const updateSuccess = useAppSelector(state => state.customerLoan.updateSuccess);
  const paymentTypeValues = Object.keys(PaymentType);
  const loanStatusValues = Object.keys(LoanStatus);

  const handleClose = () => {
    navigate(`/customer-loan${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getVehicleValuationReports({}));
    dispatch(getInstallmentPlans({}));
    dispatch(getUsers({}));
    dispatch(getCustomers({}));
    dispatch(getLoanTemplates({}));
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
    if (values.loanPeriod !== undefined && typeof values.loanPeriod !== 'number') {
      values.loanPeriod = Number(values.loanPeriod);
    }
    values.insertTs = convertDateTimeToServer(values.insertTs);
    values.modifiedTs = convertDateTimeToServer(values.modifiedTs);

    const entity = {
      ...customerLoanEntity,
      ...values,
      valuationReport: vehicleValuationReports.find(it => it.id.toString() === values.valuationReport?.toString()),
      installmentPlan: installmentPlans.find(it => it.id.toString() === values.installmentPlan?.toString()),
      createdBy: users.find(it => it.id.toString() === values.createdBy?.toString()),
      modifiedBy: users.find(it => it.id.toString() === values.modifiedBy?.toString()),
      customer: customers.find(it => it.id.toString() === values.customer?.toString()),
      loanTemplate: loanTemplates.find(it => it.id.toString() === values.loanTemplate?.toString()),
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
          loanPaymentType: 'DAILY',
          status: 'DRAFT',
          ...customerLoanEntity,
          insertTs: convertDateTimeFromServer(customerLoanEntity.insertTs),
          modifiedTs: convertDateTimeFromServer(customerLoanEntity.modifiedTs),
          valuationReport: customerLoanEntity?.valuationReport?.id,
          installmentPlan: customerLoanEntity?.installmentPlan?.id,
          createdBy: customerLoanEntity?.createdBy?.id,
          modifiedBy: customerLoanEntity?.modifiedBy?.id,
          customer: customerLoanEntity?.customer?.id,
          loanTemplate: customerLoanEntity?.loanTemplate?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="microcreditclientApp.customerLoan.home.createOrEditLabel" data-cy="CustomerLoanCreateUpdateHeading">
            <Translate contentKey="microcreditclientApp.customerLoan.home.createOrEditLabel">Create or edit a CustomerLoan</Translate>
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
                  id="customer-loan-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('microcreditclientApp.customerLoan.loanId')}
                id="customer-loan-loanId"
                name="loanId"
                data-cy="loanId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.customerLoan.amount')}
                id="customer-loan-amount"
                name="amount"
                data-cy="amount"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.customerLoan.loanPaymentType')}
                id="customer-loan-loanPaymentType"
                name="loanPaymentType"
                data-cy="loanPaymentType"
                type="select"
              >
                {paymentTypeValues.map(paymentType => (
                  <option value={paymentType} key={paymentType}>
                    {translate(`microcreditclientApp.PaymentType.${paymentType}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('microcreditclientApp.customerLoan.loanPeriod')}
                id="customer-loan-loanPeriod"
                name="loanPeriod"
                data-cy="loanPeriod"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.customerLoan.createdDate')}
                id="customer-loan-createdDate"
                name="createdDate"
                data-cy="createdDate"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.customerLoan.lastModifiedDate')}
                id="customer-loan-lastModifiedDate"
                name="lastModifiedDate"
                data-cy="lastModifiedDate"
                type="date"
              />
              <ValidatedField
                label={translate('microcreditclientApp.customerLoan.paymentStartDate')}
                id="customer-loan-paymentStartDate"
                name="paymentStartDate"
                data-cy="paymentStartDate"
                type="date"
              />
              <ValidatedField
                label={translate('microcreditclientApp.customerLoan.paymentEndDate')}
                id="customer-loan-paymentEndDate"
                name="paymentEndDate"
                data-cy="paymentEndDate"
                type="date"
              />
              <ValidatedField
                label={translate('microcreditclientApp.customerLoan.status')}
                id="customer-loan-status"
                name="status"
                data-cy="status"
                type="select"
              >
                {loanStatusValues.map(loanStatus => (
                  <option value={loanStatus} key={loanStatus}>
                    {translate(`microcreditclientApp.LoanStatus.${loanStatus}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('microcreditclientApp.customerLoan.insertTs')}
                id="customer-loan-insertTs"
                name="insertTs"
                data-cy="insertTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('microcreditclientApp.customerLoan.modifiedTs')}
                id="customer-loan-modifiedTs"
                name="modifiedTs"
                data-cy="modifiedTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="customer-loan-valuationReport"
                name="valuationReport"
                data-cy="valuationReport"
                label={translate('microcreditclientApp.customerLoan.valuationReport')}
                type="select"
              >
                <option value="" key="0" />
                {vehicleValuationReports
                  ? vehicleValuationReports.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="customer-loan-installmentPlan"
                name="installmentPlan"
                data-cy="installmentPlan"
                label={translate('microcreditclientApp.customerLoan.installmentPlan')}
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
              <ValidatedField
                id="customer-loan-createdBy"
                name="createdBy"
                data-cy="createdBy"
                label={translate('microcreditclientApp.customerLoan.createdBy')}
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
                id="customer-loan-modifiedBy"
                name="modifiedBy"
                data-cy="modifiedBy"
                label={translate('microcreditclientApp.customerLoan.modifiedBy')}
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
                id="customer-loan-customer"
                name="customer"
                data-cy="customer"
                label={translate('microcreditclientApp.customerLoan.customer')}
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
              <ValidatedField
                id="customer-loan-loanTemplate"
                name="loanTemplate"
                data-cy="loanTemplate"
                label={translate('microcreditclientApp.customerLoan.loanTemplate')}
                type="select"
              >
                <option value="" key="0" />
                {loanTemplates
                  ? loanTemplates.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/customer-loan" replace color="info">
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

export default CustomerLoanUpdate;
