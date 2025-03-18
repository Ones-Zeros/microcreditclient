import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { TextFormat, Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './vehicle-model.reducer';

export const VehicleModelDetail = () => {
  const dispatch = useAppDispatch();
  const updateSuccess = useAppSelector(state => state.vehicleModel.updateSuccess);
  const { id } = useParams<'id'>();
  useEffect(() => {
    if (id) {
      dispatch(getEntity(id));
    }
  }, [id, dispatch, updateSuccess]);
  const brandId = useAppSelector(state => state.vehicleBrand.entity.id);
  const vehicleModelEntity = useAppSelector(state => state.vehicleModel.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehicleModelDetailsHeading">
          <Translate contentKey="microcreditclientApp.vehicleModel.detail.title">VehicleModel</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="microcreditclientApp.vehicleModel.id">Id</Translate>
            </span>
          </dt>
          <dd>{vehicleModelEntity.id}</dd>
          <dt>
            <span id="model">
              <Translate contentKey="microcreditclientApp.vehicleModel.model">Model</Translate>
            </span>
          </dt>
          <dd>{vehicleModelEntity.model}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="microcreditclientApp.vehicleModel.description">Description</Translate>
            </span>
          </dt>
          <dd>{vehicleModelEntity.description}</dd>
          <dt>
            <span id="insertTs">
              <Translate contentKey="microcreditclientApp.vehicleModel.insertTs">Insert Ts</Translate>
            </span>
          </dt>
          <dd>
            {vehicleModelEntity.insertTs ? <TextFormat value={vehicleModelEntity.insertTs} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="modifiedTs">
              <Translate contentKey="microcreditclientApp.vehicleModel.modifiedTs">Modified Ts</Translate>
            </span>
          </dt>
          <dd>
            {vehicleModelEntity.modifiedTs ? (
              <TextFormat value={vehicleModelEntity.modifiedTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="microcreditclientApp.vehicleModel.createdBy">Created By</Translate>
          </dt>
          <dd>{vehicleModelEntity.createdBy ? vehicleModelEntity.createdBy.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.vehicleModel.modifiedBy">Modified By</Translate>
          </dt>
          <dd>{vehicleModelEntity.modifiedBy ? vehicleModelEntity.modifiedBy.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.vehicleModel.vehicleBrand">Vehicle Brand</Translate>
          </dt>
          <dd>{vehicleModelEntity.vehicleBrand ? vehicleModelEntity.vehicleBrand.id : ''}</dd>
        </dl>
        <Button tag={Link} to={`/vehicle-brand/${brandId}/edit`} replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-model/${vehicleModelEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default VehicleModelDetail;
