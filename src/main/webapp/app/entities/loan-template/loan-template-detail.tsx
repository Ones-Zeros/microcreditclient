import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './loan-template.reducer';

export const LoanTemplateDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const loanTemplateEntity = useAppSelector(state => state.loanTemplate.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="loanTemplateDetailsHeading">
          <Translate contentKey="microcreditclientApp.loanTemplate.detail.title">LoanTemplate</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{loanTemplateEntity.id}</dd>
          <dt>
            <span id="templateId">
              <Translate contentKey="microcreditclientApp.loanTemplate.templateId">Template Id</Translate>
            </span>
          </dt>
          <dd>{loanTemplateEntity.templateId}</dd>
          <dt>
            <span id="templateName">
              <Translate contentKey="microcreditclientApp.loanTemplate.templateName">Template Name</Translate>
            </span>
          </dt>
          <dd>{loanTemplateEntity.templateName}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="microcreditclientApp.loanTemplate.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{loanTemplateEntity.amount}</dd>
          <dt>
            <span id="paymentType">
              <Translate contentKey="microcreditclientApp.loanTemplate.paymentType">Payment Type</Translate>
            </span>
          </dt>
          <dd>{loanTemplateEntity.paymentType}</dd>
          <dt>
            <span id="interest">
              <Translate contentKey="microcreditclientApp.loanTemplate.interest">Interest</Translate>
            </span>
          </dt>
          <dd>{loanTemplateEntity.interest}</dd>
          <dt>
            <span id="intPercentage">
              <Translate contentKey="microcreditclientApp.loanTemplate.intPercentage">Int Percentage</Translate>
            </span>
          </dt>
          <dd>{loanTemplateEntity.intPercentage}</dd>
          <dt>
            <span id="insertTs">
              <Translate contentKey="microcreditclientApp.loanTemplate.insertTs">Insert Ts</Translate>
            </span>
          </dt>
          <dd>
            {loanTemplateEntity.insertTs ? <TextFormat value={loanTemplateEntity.insertTs} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="modifiedTs">
              <Translate contentKey="microcreditclientApp.loanTemplate.modifiedTs">Modified Ts</Translate>
            </span>
          </dt>
          <dd>
            {loanTemplateEntity.modifiedTs ? (
              <TextFormat value={loanTemplateEntity.modifiedTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="microcreditclientApp.loanTemplate.createdBy">Created By</Translate>
          </dt>
          <dd>{loanTemplateEntity.createdBy ? loanTemplateEntity.createdBy.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.loanTemplate.modifiedBy">Modified By</Translate>
          </dt>
          <dd>{loanTemplateEntity.modifiedBy ? loanTemplateEntity.modifiedBy.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/loan-template" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/loan-template/${loanTemplateEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LoanTemplateDetail;
