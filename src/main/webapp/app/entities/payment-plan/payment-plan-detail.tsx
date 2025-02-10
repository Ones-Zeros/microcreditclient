import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './payment-plan.reducer';

export const PaymentPlanDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const paymentPlanEntity = useAppSelector(state => state.paymentPlan.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="paymentPlanDetailsHeading">
          <Translate contentKey="microcreditclientApp.paymentPlan.detail.title">PaymentPlan</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="microcreditclientApp.paymentPlan.id">Id</Translate>
            </span>
          </dt>
          <dd>{paymentPlanEntity.id}</dd>
          <dt>
            <span id="loanId">
              <Translate contentKey="microcreditclientApp.paymentPlan.loanId">Loan Id</Translate>
            </span>
          </dt>
          <dd>{paymentPlanEntity.loanId}</dd>
          <dt>
            <span id="insertTs">
              <Translate contentKey="microcreditclientApp.paymentPlan.insertTs">Insert Ts</Translate>
            </span>
          </dt>
          <dd>
            {paymentPlanEntity.insertTs ? <TextFormat value={paymentPlanEntity.insertTs} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="modifiedTs">
              <Translate contentKey="microcreditclientApp.paymentPlan.modifiedTs">Modified Ts</Translate>
            </span>
          </dt>
          <dd>
            {paymentPlanEntity.modifiedTs ? <TextFormat value={paymentPlanEntity.modifiedTs} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="microcreditclientApp.paymentPlan.customerLoan">Customer Loan</Translate>
          </dt>
          <dd>{paymentPlanEntity.customerLoan ? paymentPlanEntity.customerLoan.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/payment-plan" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payment-plan/${paymentPlanEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PaymentPlanDetail;
