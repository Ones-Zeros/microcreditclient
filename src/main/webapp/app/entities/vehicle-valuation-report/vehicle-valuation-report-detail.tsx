import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './vehicle-valuation-report.reducer';

export const VehicleValuationReportDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const vehicleValuationReportEntity = useAppSelector(state => state.vehicleValuationReport.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehicleValuationReportDetailsHeading">
          <Translate contentKey="microcreditclientApp.vehicleValuationReport.detail.title">VehicleValuationReport</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="microcreditclientApp.vehicleValuationReport.id">Id</Translate>
            </span>
          </dt>
          <dd>{vehicleValuationReportEntity.id}</dd>
          <dt>
            <span id="vehicleNo">
              <Translate contentKey="microcreditclientApp.vehicleValuationReport.vehicleNo">Vehicle No</Translate>
            </span>
          </dt>
          <dd>{vehicleValuationReportEntity.vehicleNo}</dd>
          <dt>
            <span id="chassisNumber">
              <Translate contentKey="microcreditclientApp.vehicleValuationReport.chassisNumber">Chassis Number</Translate>
            </span>
          </dt>
          <dd>{vehicleValuationReportEntity.chassisNumber}</dd>
          <dt>
            <span id="engineId">
              <Translate contentKey="microcreditclientApp.vehicleValuationReport.engineId">Engine Id</Translate>
            </span>
          </dt>
          <dd>{vehicleValuationReportEntity.engineId}</dd>
          <dt>
            <span id="engineCapacity">
              <Translate contentKey="microcreditclientApp.vehicleValuationReport.engineCapacity">Engine Capacity</Translate>
            </span>
          </dt>
          <dd>{vehicleValuationReportEntity.engineCapacity}</dd>
          <dt>
            <span id="imgUrl1">
              <Translate contentKey="microcreditclientApp.vehicleValuationReport.imgUrl1">Img Url 1</Translate>
            </span>
          </dt>
          <dd>{vehicleValuationReportEntity.imgUrl1}</dd>
          <dt>
            <span id="imgUrl2">
              <Translate contentKey="microcreditclientApp.vehicleValuationReport.imgUrl2">Img Url 2</Translate>
            </span>
          </dt>
          <dd>{vehicleValuationReportEntity.imgUrl2}</dd>
          <dt>
            <span id="imgUrl3">
              <Translate contentKey="microcreditclientApp.vehicleValuationReport.imgUrl3">Img Url 3</Translate>
            </span>
          </dt>
          <dd>{vehicleValuationReportEntity.imgUrl3}</dd>
          <dt>
            <span id="imgUrl4">
              <Translate contentKey="microcreditclientApp.vehicleValuationReport.imgUrl4">Img Url 4</Translate>
            </span>
          </dt>
          <dd>{vehicleValuationReportEntity.imgUrl4}</dd>
          <dt>
            <span id="imgUrl5">
              <Translate contentKey="microcreditclientApp.vehicleValuationReport.imgUrl5">Img Url 5</Translate>
            </span>
          </dt>
          <dd>{vehicleValuationReportEntity.imgUrl5}</dd>
          <dt>
            <span id="imgUrl6">
              <Translate contentKey="microcreditclientApp.vehicleValuationReport.imgUrl6">Img Url 6</Translate>
            </span>
          </dt>
          <dd>{vehicleValuationReportEntity.imgUrl6}</dd>
          <dt>
            <span id="insertTs">
              <Translate contentKey="microcreditclientApp.vehicleValuationReport.insertTs">Insert Ts</Translate>
            </span>
          </dt>
          <dd>
            {vehicleValuationReportEntity.insertTs ? (
              <TextFormat value={vehicleValuationReportEntity.insertTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="modifiedTs">
              <Translate contentKey="microcreditclientApp.vehicleValuationReport.modifiedTs">Modified Ts</Translate>
            </span>
          </dt>
          <dd>
            {vehicleValuationReportEntity.modifiedTs ? (
              <TextFormat value={vehicleValuationReportEntity.modifiedTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="microcreditclientApp.vehicleValuationReport.vehicleModel">Vehicle Model</Translate>
          </dt>
          <dd>{vehicleValuationReportEntity.vehicleModel ? vehicleValuationReportEntity.vehicleModel.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/vehicle-valuation-report" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-valuation-report/${vehicleValuationReportEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default VehicleValuationReportDetail;
