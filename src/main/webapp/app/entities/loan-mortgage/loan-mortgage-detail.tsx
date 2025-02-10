import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './loan-mortgage.reducer';

export const LoanMortgageDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const loanMortgageEntity = useAppSelector(state => state.loanMortgage.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="loanMortgageDetailsHeading">
          <Translate contentKey="microcreditclientApp.loanMortgage.detail.title">LoanMortgage</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="microcreditclientApp.loanMortgage.id">Id</Translate>
            </span>
          </dt>
          <dd>{loanMortgageEntity.id}</dd>
          <dt>
            <span id="loanId">
              <Translate contentKey="microcreditclientApp.loanMortgage.loanId">Loan Id</Translate>
            </span>
          </dt>
          <dd>{loanMortgageEntity.loanId}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="microcreditclientApp.loanMortgage.type">Type</Translate>
            </span>
          </dt>
          <dd>{loanMortgageEntity.type}</dd>
          <dt>
            <span id="insertTs">
              <Translate contentKey="microcreditclientApp.loanMortgage.insertTs">Insert Ts</Translate>
            </span>
          </dt>
          <dd>
            {loanMortgageEntity.insertTs ? <TextFormat value={loanMortgageEntity.insertTs} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="modifiedTs">
              <Translate contentKey="microcreditclientApp.loanMortgage.modifiedTs">Modified Ts</Translate>
            </span>
          </dt>
          <dd>
            {loanMortgageEntity.modifiedTs ? (
              <TextFormat value={loanMortgageEntity.modifiedTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="microcreditclientApp.loanMortgage.customerLoan">Customer Loan</Translate>
          </dt>
          <dd>{loanMortgageEntity.customerLoan ? loanMortgageEntity.customerLoan.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/loan-mortgage" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/loan-mortgage/${loanMortgageEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LoanMortgageDetail;
