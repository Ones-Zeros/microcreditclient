import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './collector-route.reducer';

export const CollectorRouteDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const collectorRouteEntity = useAppSelector(state => state.collectorRoute.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="collectorRouteDetailsHeading">
          <Translate contentKey="microcreditclientApp.collectorRoute.detail.title">CollectorRoute</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="microcreditclientApp.collectorRoute.id">Id</Translate>
            </span>
          </dt>
          <dd>{collectorRouteEntity.id}</dd>
          <dt>
            <span id="routeId">
              <Translate contentKey="microcreditclientApp.collectorRoute.routeId">Route Id</Translate>
            </span>
          </dt>
          <dd>{collectorRouteEntity.routeId}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="microcreditclientApp.collectorRoute.description">Description</Translate>
            </span>
          </dt>
          <dd>{collectorRouteEntity.description}</dd>
          <dt>
            <span id="insertTs">
              <Translate contentKey="microcreditclientApp.collectorRoute.insertTs">Insert Ts</Translate>
            </span>
          </dt>
          <dd>
            {collectorRouteEntity.insertTs ? (
              <TextFormat value={collectorRouteEntity.insertTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="modifiedTs">
              <Translate contentKey="microcreditclientApp.collectorRoute.modifiedTs">Modified Ts</Translate>
            </span>
          </dt>
          <dd>
            {collectorRouteEntity.modifiedTs ? (
              <TextFormat value={collectorRouteEntity.modifiedTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="microcreditclientApp.collectorRoute.createdBy">Created By</Translate>
          </dt>
          <dd>{collectorRouteEntity.createdBy ? collectorRouteEntity.createdBy.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.collectorRoute.modifiedBy">Modified By</Translate>
          </dt>
          <dd>{collectorRouteEntity.modifiedBy ? collectorRouteEntity.modifiedBy.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/collector-route" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/collector-route/${collectorRouteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CollectorRouteDetail;
