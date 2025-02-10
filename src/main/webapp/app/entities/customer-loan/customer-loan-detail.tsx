import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './customer-loan.reducer';

export const CustomerLoanDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const customerLoanEntity = useAppSelector(state => state.customerLoan.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="customerLoanDetailsHeading">
          <Translate contentKey="microcreditclientApp.customerLoan.detail.title">CustomerLoan</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{customerLoanEntity.id}</dd>
          <dt>
            <span id="loanId">
              <Translate contentKey="microcreditclientApp.customerLoan.loanId">Loan Id</Translate>
            </span>
          </dt>
          <dd>{customerLoanEntity.loanId}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="microcreditclientApp.customerLoan.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{customerLoanEntity.amount}</dd>
          <dt>
            <span id="loanPaymentType">
              <Translate contentKey="microcreditclientApp.customerLoan.loanPaymentType">Loan Payment Type</Translate>
            </span>
          </dt>
          <dd>{customerLoanEntity.loanPaymentType}</dd>
          <dt>
            <span id="loanPeriod">
              <Translate contentKey="microcreditclientApp.customerLoan.loanPeriod">Loan Period</Translate>
            </span>
          </dt>
          <dd>{customerLoanEntity.loanPeriod}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="microcreditclientApp.customerLoan.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {customerLoanEntity.createdDate ? (
              <TextFormat value={customerLoanEntity.createdDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedDate">
              <Translate contentKey="microcreditclientApp.customerLoan.lastModifiedDate">Last Modified Date</Translate>
            </span>
          </dt>
          <dd>
            {customerLoanEntity.lastModifiedDate ? (
              <TextFormat value={customerLoanEntity.lastModifiedDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="paymentStartDate">
              <Translate contentKey="microcreditclientApp.customerLoan.paymentStartDate">Payment Start Date</Translate>
            </span>
          </dt>
          <dd>
            {customerLoanEntity.paymentStartDate ? (
              <TextFormat value={customerLoanEntity.paymentStartDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="paymentEndDate">
              <Translate contentKey="microcreditclientApp.customerLoan.paymentEndDate">Payment End Date</Translate>
            </span>
          </dt>
          <dd>
            {customerLoanEntity.paymentEndDate ? (
              <TextFormat value={customerLoanEntity.paymentEndDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="status">
              <Translate contentKey="microcreditclientApp.customerLoan.status">Status</Translate>
            </span>
          </dt>
          <dd>{customerLoanEntity.status}</dd>
          <dt>
            <span id="insertTs">
              <Translate contentKey="microcreditclientApp.customerLoan.insertTs">Insert Ts</Translate>
            </span>
          </dt>
          <dd>
            {customerLoanEntity.insertTs ? <TextFormat value={customerLoanEntity.insertTs} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="modifiedTs">
              <Translate contentKey="microcreditclientApp.customerLoan.modifiedTs">Modified Ts</Translate>
            </span>
          </dt>
          <dd>
            {customerLoanEntity.modifiedTs ? (
              <TextFormat value={customerLoanEntity.modifiedTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="microcreditclientApp.customerLoan.valuationReport">Valuation Report</Translate>
          </dt>
          <dd>{customerLoanEntity.valuationReport ? customerLoanEntity.valuationReport.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.customerLoan.installmentPlan">Installment Plan</Translate>
          </dt>
          <dd>{customerLoanEntity.installmentPlan ? customerLoanEntity.installmentPlan.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.customerLoan.createdBy">Created By</Translate>
          </dt>
          <dd>{customerLoanEntity.createdBy ? customerLoanEntity.createdBy.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.customerLoan.modifiedBy">Modified By</Translate>
          </dt>
          <dd>{customerLoanEntity.modifiedBy ? customerLoanEntity.modifiedBy.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.customerLoan.customer">Customer</Translate>
          </dt>
          <dd>{customerLoanEntity.customer ? customerLoanEntity.customer.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.customerLoan.loanTemplate">Loan Template</Translate>
          </dt>
          <dd>{customerLoanEntity.loanTemplate ? customerLoanEntity.loanTemplate.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/customer-loan" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer-loan/${customerLoanEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CustomerLoanDetail;
