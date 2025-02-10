import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './customer-bank-info.reducer';

export const CustomerBankInfoDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const customerBankInfoEntity = useAppSelector(state => state.customerBankInfo.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="customerBankInfoDetailsHeading">
          <Translate contentKey="microcreditclientApp.customerBankInfo.detail.title">CustomerBankInfo</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{customerBankInfoEntity.id}</dd>
          <dt>
            <span id="accountNumber">
              <Translate contentKey="microcreditclientApp.customerBankInfo.accountNumber">Account Number</Translate>
            </span>
          </dt>
          <dd>{customerBankInfoEntity.accountNumber}</dd>
          <dt>
            <span id="insertTs">
              <Translate contentKey="microcreditclientApp.customerBankInfo.insertTs">Insert Ts</Translate>
            </span>
          </dt>
          <dd>
            {customerBankInfoEntity.insertTs ? (
              <TextFormat value={customerBankInfoEntity.insertTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="modifiedTs">
              <Translate contentKey="microcreditclientApp.customerBankInfo.modifiedTs">Modified Ts</Translate>
            </span>
          </dt>
          <dd>
            {customerBankInfoEntity.modifiedTs ? (
              <TextFormat value={customerBankInfoEntity.modifiedTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="microcreditclientApp.customerBankInfo.bankBranch">Bank Branch</Translate>
          </dt>
          <dd>{customerBankInfoEntity.bankBranch ? customerBankInfoEntity.bankBranch.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.customerBankInfo.customer">Customer</Translate>
          </dt>
          <dd>{customerBankInfoEntity.customer ? customerBankInfoEntity.customer.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/customer-bank-info" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer-bank-info/${customerBankInfoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CustomerBankInfoDetail;
