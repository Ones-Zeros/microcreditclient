import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './bank-branch.reducer';

export const BankBranchDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const bankBranchEntity = useAppSelector(state => state.bankBranch.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bankBranchDetailsHeading">
          <Translate contentKey="microcreditclientApp.bankBranch.detail.title">BankBranch</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{bankBranchEntity.id}</dd>
          <dt>
            <span id="branchName">
              <Translate contentKey="microcreditclientApp.bankBranch.branchName">Branch Name</Translate>
            </span>
          </dt>
          <dd>{bankBranchEntity.branchName}</dd>
          <dt>
            <span id="branchId">
              <Translate contentKey="microcreditclientApp.bankBranch.branchId">Branch Id</Translate>
            </span>
          </dt>
          <dd>{bankBranchEntity.branchId}</dd>
          <dt>
            <span id="branchLocation">
              <Translate contentKey="microcreditclientApp.bankBranch.branchLocation">Branch Location</Translate>
            </span>
          </dt>
          <dd>{bankBranchEntity.branchLocation}</dd>
          <dt>
            <span id="insertTs">
              <Translate contentKey="microcreditclientApp.bankBranch.insertTs">Insert Ts</Translate>
            </span>
          </dt>
          <dd>
            {bankBranchEntity.insertTs ? <TextFormat value={bankBranchEntity.insertTs} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="modifiedTs">
              <Translate contentKey="microcreditclientApp.bankBranch.modifiedTs">Modified Ts</Translate>
            </span>
          </dt>
          <dd>
            {bankBranchEntity.modifiedTs ? <TextFormat value={bankBranchEntity.modifiedTs} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="microcreditclientApp.bankBranch.createdBy">Created By</Translate>
          </dt>
          <dd>{bankBranchEntity.createdBy ? bankBranchEntity.createdBy.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.bankBranch.modifiedBy">Modified By</Translate>
          </dt>
          <dd>{bankBranchEntity.modifiedBy ? bankBranchEntity.modifiedBy.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.bankBranch.bank">Bank</Translate>
          </dt>
          <dd>{bankBranchEntity.bank ? bankBranchEntity.bank.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/bank-branch" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bank-branch/${bankBranchEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BankBranchDetail;
