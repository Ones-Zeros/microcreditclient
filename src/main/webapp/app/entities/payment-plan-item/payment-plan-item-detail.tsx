import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './payment-plan-item.reducer';

export const PaymentPlanItemDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const paymentPlanItemEntity = useAppSelector(state => state.paymentPlanItem.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="paymentPlanItemDetailsHeading">
          <Translate contentKey="microcreditclientApp.paymentPlanItem.detail.title">PaymentPlanItem</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="microcreditclientApp.paymentPlanItem.id">Id</Translate>
            </span>
          </dt>
          <dd>{paymentPlanItemEntity.id}</dd>
          <dt>
            <span id="amountPaid">
              <Translate contentKey="microcreditclientApp.paymentPlanItem.amountPaid">Amount Paid</Translate>
            </span>
          </dt>
          <dd>{paymentPlanItemEntity.amountPaid}</dd>
          <dt>
            <span id="insertTs">
              <Translate contentKey="microcreditclientApp.paymentPlanItem.insertTs">Insert Ts</Translate>
            </span>
          </dt>
          <dd>
            {paymentPlanItemEntity.insertTs ? (
              <TextFormat value={paymentPlanItemEntity.insertTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="modifiedTs">
              <Translate contentKey="microcreditclientApp.paymentPlanItem.modifiedTs">Modified Ts</Translate>
            </span>
          </dt>
          <dd>
            {paymentPlanItemEntity.modifiedTs ? (
              <TextFormat value={paymentPlanItemEntity.modifiedTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="microcreditclientApp.paymentPlanItem.user">User</Translate>
          </dt>
          <dd>{paymentPlanItemEntity.user ? paymentPlanItemEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.paymentPlanItem.paymentPlan">Payment Plan</Translate>
          </dt>
          <dd>{paymentPlanItemEntity.paymentPlan ? paymentPlanItemEntity.paymentPlan.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/payment-plan-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payment-plan-item/${paymentPlanItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PaymentPlanItemDetail;
