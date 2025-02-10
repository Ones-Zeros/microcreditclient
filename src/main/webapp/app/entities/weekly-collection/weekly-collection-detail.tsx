import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './weekly-collection.reducer';

export const WeeklyCollectionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const weeklyCollectionEntity = useAppSelector(state => state.weeklyCollection.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="weeklyCollectionDetailsHeading">
          <Translate contentKey="microcreditclientApp.weeklyCollection.detail.title">WeeklyCollection</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="microcreditclientApp.weeklyCollection.id">Id</Translate>
            </span>
          </dt>
          <dd>{weeklyCollectionEntity.id}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="microcreditclientApp.weeklyCollection.description">Description</Translate>
            </span>
          </dt>
          <dd>{weeklyCollectionEntity.description}</dd>
          <dt>
            <span id="insertTs">
              <Translate contentKey="microcreditclientApp.weeklyCollection.insertTs">Insert Ts</Translate>
            </span>
          </dt>
          <dd>
            {weeklyCollectionEntity.insertTs ? (
              <TextFormat value={weeklyCollectionEntity.insertTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="modifiedTs">
              <Translate contentKey="microcreditclientApp.weeklyCollection.modifiedTs">Modified Ts</Translate>
            </span>
          </dt>
          <dd>
            {weeklyCollectionEntity.modifiedTs ? (
              <TextFormat value={weeklyCollectionEntity.modifiedTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="microcreditclientApp.weeklyCollection.createdBy">Created By</Translate>
          </dt>
          <dd>{weeklyCollectionEntity.createdBy ? weeklyCollectionEntity.createdBy.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.weeklyCollection.modifiedBy">Modified By</Translate>
          </dt>
          <dd>{weeklyCollectionEntity.modifiedBy ? weeklyCollectionEntity.modifiedBy.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.weeklyCollection.customerLoan">Customer Loan</Translate>
          </dt>
          <dd>{weeklyCollectionEntity.customerLoan ? weeklyCollectionEntity.customerLoan.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/weekly-collection" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/weekly-collection/${weeklyCollectionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default WeeklyCollectionDetail;
