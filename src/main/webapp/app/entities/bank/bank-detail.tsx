import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './bank.reducer';

export const BankDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const bankEntity = useAppSelector(state => state.bank.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bankDetailsHeading">
          <Translate contentKey="microcreditclientApp.bank.detail.title">Bank</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{bankEntity.id}</dd>
          <dt>
            <span id="bankName">
              <Translate contentKey="microcreditclientApp.bank.bankName">Bank Name</Translate>
            </span>
          </dt>
          <dd>{bankEntity.bankName}</dd>
          <dt>
            <span id="insertTs">
              <Translate contentKey="microcreditclientApp.bank.insertTs">Insert Ts</Translate>
            </span>
          </dt>
          <dd>{bankEntity.insertTs ? <TextFormat value={bankEntity.insertTs} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="modifiedTs">
              <Translate contentKey="microcreditclientApp.bank.modifiedTs">Modified Ts</Translate>
            </span>
          </dt>
          <dd>{bankEntity.modifiedTs ? <TextFormat value={bankEntity.modifiedTs} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.bank.createdBy">Created By</Translate>
          </dt>
          <dd>{bankEntity.createdBy ? bankEntity.createdBy.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.bank.modifiedBy">Modified By</Translate>
          </dt>
          <dd>{bankEntity.modifiedBy ? bankEntity.modifiedBy.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/bank" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bank/${bankEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BankDetail;
