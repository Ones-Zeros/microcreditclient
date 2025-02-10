import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate, byteSize, openFile } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './guarantor.reducer';

export const GuarantorDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const guarantorEntity = useAppSelector(state => state.guarantor.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="guarantorDetailsHeading">
          <Translate contentKey="microcreditclientApp.guarantor.detail.title">Guarantor</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="microcreditclientApp.guarantor.id">Id</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.id}</dd>
          <dt>
            <span id="nic">
              <Translate contentKey="microcreditclientApp.guarantor.nic">Nic</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.nic}</dd>
          <dt>
            <span id="guarantorName">
              <Translate contentKey="microcreditclientApp.guarantor.guarantorName">Guarantor Name</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.guarantorName}</dd>
          <dt>
            <span id="phone1">
              <Translate contentKey="microcreditclientApp.guarantor.phone1">Phone 1</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.phone1}</dd>
          <dt>
            <span id="address1">
              <Translate contentKey="microcreditclientApp.guarantor.address1">Address 1</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.address1}</dd>
          <dt>
            <span id="address2">
              <Translate contentKey="microcreditclientApp.guarantor.address2">Address 2</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.address2}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="microcreditclientApp.guarantor.city">City</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.city}</dd>
          <dt>
            <span id="picture">
              <Translate contentKey="microcreditclientApp.guarantor.picture">Picture</Translate>
            </span>
          </dt>
          <dd>
            {guarantorEntity.picture ? (
              <div>
                {guarantorEntity.pictureContentType ? (
                  <a onClick={openFile(guarantorEntity.pictureContentType, guarantorEntity.picture)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {guarantorEntity.pictureContentType}, {byteSize(guarantorEntity.picture)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="insertTs">
              <Translate contentKey="microcreditclientApp.guarantor.insertTs">Insert Ts</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.insertTs ? <TextFormat value={guarantorEntity.insertTs} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="modifiedTs">
              <Translate contentKey="microcreditclientApp.guarantor.modifiedTs">Modified Ts</Translate>
            </span>
          </dt>
          <dd>
            {guarantorEntity.modifiedTs ? <TextFormat value={guarantorEntity.modifiedTs} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="microcreditclientApp.guarantor.customerLoan">Customer Loan</Translate>
          </dt>
          <dd>{guarantorEntity.customerLoan ? guarantorEntity.customerLoan.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/guarantor" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/guarantor/${guarantorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default GuarantorDetail;
