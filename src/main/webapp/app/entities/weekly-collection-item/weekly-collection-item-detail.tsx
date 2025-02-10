import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './weekly-collection-item.reducer';

export const WeeklyCollectionItemDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const weeklyCollectionItemEntity = useAppSelector(state => state.weeklyCollectionItem.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="weeklyCollectionItemDetailsHeading">
          <Translate contentKey="microcreditclientApp.weeklyCollectionItem.detail.title">WeeklyCollectionItem</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="microcreditclientApp.weeklyCollectionItem.id">Id</Translate>
            </span>
          </dt>
          <dd>{weeklyCollectionItemEntity.id}</dd>
          <dt>
            <span id="amountToBePaid">
              <Translate contentKey="microcreditclientApp.weeklyCollectionItem.amountToBePaid">Amount To Be Paid</Translate>
            </span>
          </dt>
          <dd>{weeklyCollectionItemEntity.amountToBePaid}</dd>
          <dt>
            <span id="amountPaid">
              <Translate contentKey="microcreditclientApp.weeklyCollectionItem.amountPaid">Amount Paid</Translate>
            </span>
          </dt>
          <dd>{weeklyCollectionItemEntity.amountPaid}</dd>
          <dt>
            <span id="note">
              <Translate contentKey="microcreditclientApp.weeklyCollectionItem.note">Note</Translate>
            </span>
          </dt>
          <dd>{weeklyCollectionItemEntity.note}</dd>
          <dt>
            <span id="insertTs">
              <Translate contentKey="microcreditclientApp.weeklyCollectionItem.insertTs">Insert Ts</Translate>
            </span>
          </dt>
          <dd>
            {weeklyCollectionItemEntity.insertTs ? (
              <TextFormat value={weeklyCollectionItemEntity.insertTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="modifiedTs">
              <Translate contentKey="microcreditclientApp.weeklyCollectionItem.modifiedTs">Modified Ts</Translate>
            </span>
          </dt>
          <dd>
            {weeklyCollectionItemEntity.modifiedTs ? (
              <TextFormat value={weeklyCollectionItemEntity.modifiedTs} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="microcreditclientApp.weeklyCollectionItem.installmentPlanItem">Installment Plan Item</Translate>
          </dt>
          <dd>{weeklyCollectionItemEntity.installmentPlanItem ? weeklyCollectionItemEntity.installmentPlanItem.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.weeklyCollectionItem.weeklyCollection">Weekly Collection</Translate>
          </dt>
          <dd>{weeklyCollectionItemEntity.weeklyCollection ? weeklyCollectionItemEntity.weeklyCollection.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.weeklyCollectionItem.createdBy">Created By</Translate>
          </dt>
          <dd>{weeklyCollectionItemEntity.createdBy ? weeklyCollectionItemEntity.createdBy.id : ''}</dd>
          <dt>
            <Translate contentKey="microcreditclientApp.weeklyCollectionItem.updatedBy">Updated By</Translate>
          </dt>
          <dd>{weeklyCollectionItemEntity.updatedBy ? weeklyCollectionItemEntity.updatedBy.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/weekly-collection-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/weekly-collection-item/${weeklyCollectionItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default WeeklyCollectionItemDetail;
