import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './installment-plan.reducer';

export const InstallmentPlanDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const installmentPlanEntity = useAppSelector(state => state.installmentPlan.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="installmentPlanDetailsHeading">
          <Translate contentKey="microcreditclientApp.installmentPlan.detail.title">InstallmentPlan</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="microcreditclientApp.installmentPlan.id">Id</Translate>
            </span>
          </dt>
          <dd>{installmentPlanEntity.id}</dd>
          <dt>
            <span id="installmentDate">
              <Translate contentKey="microcreditclientApp.installmentPlan.installmentDate">Installment Date</Translate>
            </span>
          </dt>
          <dd>
            {installmentPlanEntity.installmentDate ? (
              <TextFormat value={installmentPlanEntity.installmentDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="insertTs">
              <Translate contentKey="microcreditclientApp.installmentPlan.insertTs">Insert Ts</Translate>
            </span>
          </dt>
          <dd>
            {installmentPlanEntity.insertTs ? (
              <TextFormat value={installmentPlanEntity.insertTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="modifiedTs">
              <Translate contentKey="microcreditclientApp.installmentPlan.modifiedTs">Modified Ts</Translate>
            </span>
          </dt>
          <dd>
            {installmentPlanEntity.modifiedTs ? (
              <TextFormat value={installmentPlanEntity.modifiedTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/installment-plan" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/installment-plan/${installmentPlanEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default InstallmentPlanDetail;
