import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './collector-collection-route.reducer';

export const CollectorCollectionRouteDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const collectorCollectionRouteEntity = useAppSelector(state => state.collectorCollectionRoute.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="collectorCollectionRouteDetailsHeading">
          <Translate contentKey="microcreditclientApp.collectorCollectionRoute.detail.title">CollectorCollectionRoute</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="microcreditclientApp.collectorCollectionRoute.id">Id</Translate>
            </span>
          </dt>
          <dd>{collectorCollectionRouteEntity.id}</dd>
          <dt>
            <span id="routeId">
              <Translate contentKey="microcreditclientApp.collectorCollectionRoute.routeId">Route Id</Translate>
            </span>
          </dt>
          <dd>{collectorCollectionRouteEntity.routeId}</dd>
          <dt>
            <span id="collectorId">
              <Translate contentKey="microcreditclientApp.collectorCollectionRoute.collectorId">Collector Id</Translate>
            </span>
          </dt>
          <dd>{collectorCollectionRouteEntity.collectorId}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="microcreditclientApp.collectorCollectionRoute.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            {collectorCollectionRouteEntity.startDate ? (
              <TextFormat value={collectorCollectionRouteEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="microcreditclientApp.collectorCollectionRoute.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>
            {collectorCollectionRouteEntity.endDate ? (
              <TextFormat value={collectorCollectionRouteEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="insertTs">
              <Translate contentKey="microcreditclientApp.collectorCollectionRoute.insertTs">Insert Ts</Translate>
            </span>
          </dt>
          <dd>
            {collectorCollectionRouteEntity.insertTs ? (
              <TextFormat value={collectorCollectionRouteEntity.insertTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="modifiedTs">
              <Translate contentKey="microcreditclientApp.collectorCollectionRoute.modifiedTs">Modified Ts</Translate>
            </span>
          </dt>
          <dd>
            {collectorCollectionRouteEntity.modifiedTs ? (
              <TextFormat value={collectorCollectionRouteEntity.modifiedTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="microcreditclientApp.collectorCollectionRoute.user">User</Translate>
          </dt>
          <dd>{collectorCollectionRouteEntity.user ? collectorCollectionRouteEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.collectorCollectionRoute.collectorRoute">Collector Route</Translate>
          </dt>
          <dd>{collectorCollectionRouteEntity.collectorRoute ? collectorCollectionRouteEntity.collectorRoute.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.collectorCollectionRoute.weeklyCollection">Weekly Collection</Translate>
          </dt>
          <dd>{collectorCollectionRouteEntity.weeklyCollection ? collectorCollectionRouteEntity.weeklyCollection.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/collector-collection-route" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/collector-collection-route/${collectorCollectionRouteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CollectorCollectionRouteDetail;
