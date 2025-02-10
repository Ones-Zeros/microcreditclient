import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './vehicle-brand.reducer';

export const VehicleBrandDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const vehicleBrandEntity = useAppSelector(state => state.vehicleBrand.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehicleBrandDetailsHeading">
          <Translate contentKey="microcreditclientApp.vehicleBrand.detail.title">VehicleBrand</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="microcreditclientApp.vehicleBrand.id">Id</Translate>
            </span>
          </dt>
          <dd>{vehicleBrandEntity.id}</dd>
          <dt>
            <span id="brand">
              <Translate contentKey="microcreditclientApp.vehicleBrand.brand">Brand</Translate>
            </span>
          </dt>
          <dd>{vehicleBrandEntity.brand}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="microcreditclientApp.vehicleBrand.description">Description</Translate>
            </span>
          </dt>
          <dd>{vehicleBrandEntity.description}</dd>
          <dt>
            <span id="insertTs">
              <Translate contentKey="microcreditclientApp.vehicleBrand.insertTs">Insert Ts</Translate>
            </span>
          </dt>
          <dd>
            {vehicleBrandEntity.insertTs ? <TextFormat value={vehicleBrandEntity.insertTs} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="modifiedTs">
              <Translate contentKey="microcreditclientApp.vehicleBrand.modifiedTs">Modified Ts</Translate>
            </span>
          </dt>
          <dd>
            {vehicleBrandEntity.modifiedTs ? (
              <TextFormat value={vehicleBrandEntity.modifiedTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="microcreditclientApp.vehicleBrand.createdBy">Created By</Translate>
          </dt>
          <dd>{vehicleBrandEntity.createdBy ? vehicleBrandEntity.createdBy.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.vehicleBrand.modifiedBy">Modified By</Translate>
          </dt>
          <dd>{vehicleBrandEntity.modifiedBy ? vehicleBrandEntity.modifiedBy.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/vehicle-brand" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-brand/${vehicleBrandEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default VehicleBrandDetail;
