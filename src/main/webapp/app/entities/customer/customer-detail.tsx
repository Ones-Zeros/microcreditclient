import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate, byteSize, openFile } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './customer.reducer';

export const CustomerDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const customerEntity = useAppSelector(state => state.customer.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="customerDetailsHeading">
          <Translate contentKey="microcreditclientApp.customer.detail.title">Customer</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="microcreditclientApp.customer.id">Id</Translate>
            </span>
          </dt>
          <dd>{customerEntity.id}</dd>
          <dt>
            <span id="custId">
              <Translate contentKey="microcreditclientApp.customer.custId">Cust Id</Translate>
            </span>
          </dt>
          <dd>{customerEntity.custId}</dd>
          <dt>
            <span id="nic">
              <Translate contentKey="microcreditclientApp.customer.nic">Nic</Translate>
            </span>
          </dt>
          <dd>{customerEntity.nic}</dd>
          <dt>
            <span id="custName">
              <Translate contentKey="microcreditclientApp.customer.custName">Cust Name</Translate>
            </span>
          </dt>
          <dd>{customerEntity.custName}</dd>
          <dt>
            <span id="address1">
              <Translate contentKey="microcreditclientApp.customer.address1">Address 1</Translate>
            </span>
          </dt>
          <dd>{customerEntity.address1}</dd>
          <dt>
            <span id="address2">
              <Translate contentKey="microcreditclientApp.customer.address2">Address 2</Translate>
            </span>
          </dt>
          <dd>{customerEntity.address2}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="microcreditclientApp.customer.city">City</Translate>
            </span>
          </dt>
          <dd>{customerEntity.city}</dd>
          <dt>
            <span id="phone1">
              <Translate contentKey="microcreditclientApp.customer.phone1">Phone 1</Translate>
            </span>
          </dt>
          <dd>{customerEntity.phone1}</dd>
          <dt>
            <span id="phone2">
              <Translate contentKey="microcreditclientApp.customer.phone2">Phone 2</Translate>
            </span>
          </dt>
          <dd>{customerEntity.phone2}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="microcreditclientApp.customer.email">Email</Translate>
            </span>
          </dt>
          <dd>{customerEntity.email}</dd>
          <dt>
            <span id="creditLimit">
              <Translate contentKey="microcreditclientApp.customer.creditLimit">Credit Limit</Translate>
            </span>
          </dt>
          <dd>{customerEntity.creditLimit}</dd>
          <dt>
            <span id="photo">
              <Translate contentKey="microcreditclientApp.customer.photo">Photo</Translate>
            </span>
          </dt>
          <dd>
            {customerEntity.photo ? (
              <div>
                {customerEntity.photoContentType ? (
                  <a onClick={openFile(customerEntity.photoContentType, customerEntity.photo)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {customerEntity.photoContentType}, {byteSize(customerEntity.photo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="status">
              <Translate contentKey="microcreditclientApp.customer.status">Status</Translate>
            </span>
          </dt>
          <dd>{customerEntity.status}</dd>
          <dt>
            <span id="insertTs">
              <Translate contentKey="microcreditclientApp.customer.insertTs">Insert Ts</Translate>
            </span>
          </dt>
          <dd>{customerEntity.insertTs ? <TextFormat value={customerEntity.insertTs} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="modifiedTs">
              <Translate contentKey="microcreditclientApp.customer.modifiedTs">Modified Ts</Translate>
            </span>
          </dt>
          <dd>
            {customerEntity.modifiedTs ? <TextFormat value={customerEntity.modifiedTs} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="microcreditclientApp.customer.createdBy">Created By</Translate>
          </dt>
          <dd>{customerEntity.createdBy ? customerEntity.createdBy.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.customer.modifiedBy">Modified By</Translate>
          </dt>
          <dd>{customerEntity.modifiedBy ? customerEntity.modifiedBy.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/customer" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer/${customerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CustomerDetail;
