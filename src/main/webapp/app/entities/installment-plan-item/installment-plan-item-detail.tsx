import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './installment-plan-item.reducer';

export const InstallmentPlanItemDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const installmentPlanItemEntity = useAppSelector(state => state.installmentPlanItem.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="installmentPlanItemDetailsHeading">
          <Translate contentKey="microcreditclientApp.installmentPlanItem.detail.title">InstallmentPlanItem</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{installmentPlanItemEntity.id}</dd>
          <dt>
            <span id="toBePaid">
              <Translate contentKey="microcreditclientApp.installmentPlanItem.toBePaid">To Be Paid</Translate>
            </span>
          </dt>
          <dd>
            {installmentPlanItemEntity.toBePaid ? (
              <TextFormat value={installmentPlanItemEntity.toBePaid} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="amount">
              <Translate contentKey="microcreditclientApp.installmentPlanItem.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{installmentPlanItemEntity.amount}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="microcreditclientApp.installmentPlanItem.status">Status</Translate>
            </span>
          </dt>
          <dd>{installmentPlanItemEntity.status}</dd>
          <dt>
            <span id="insertTs">
              <Translate contentKey="microcreditclientApp.installmentPlanItem.insertTs">Insert Ts</Translate>
            </span>
          </dt>
          <dd>
            {installmentPlanItemEntity.insertTs ? (
              <TextFormat value={installmentPlanItemEntity.insertTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="modifiedTs">
              <Translate contentKey="microcreditclientApp.installmentPlanItem.modifiedTs">Modified Ts</Translate>
            </span>
          </dt>
          <dd>
            {installmentPlanItemEntity.modifiedTs ? (
              <TextFormat value={installmentPlanItemEntity.modifiedTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="microcreditclientApp.installmentPlanItem.installmentPlan">Installment Plan</Translate>
          </dt>
          <dd>{installmentPlanItemEntity.installmentPlan ? installmentPlanItemEntity.installmentPlan.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/installment-plan-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/installment-plan-item/${installmentPlanItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default InstallmentPlanItemDetail;
