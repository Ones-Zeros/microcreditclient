import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntities as getCustomerLoans } from 'app/entities/customer-loan/customer-loan.reducer';
import { createEntity, getEntity, reset, updateEntity } from './weekly-collection.reducer';

export const WeeklyCollectionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const customerLoans = useAppSelector(state => state.customerLoan.entities);
  const weeklyCollectionEntity = useAppSelector(state => state.weeklyCollection.entity);
  const loading = useAppSelector(state => state.weeklyCollection.loading);
  const updating = useAppSelector(state => state.weeklyCollection.updating);
  const updateSuccess = useAppSelector(state => state.weeklyCollection.updateSuccess);

  const handleClose = () => {
    navigate(`/weekly-collection${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
    dispatch(getCustomerLoans({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.insertTs = convertDateTimeToServer(values.insertTs);
    values.modifiedTs = convertDateTimeToServer(values.modifiedTs);

    const entity = {
      ...weeklyCollectionEntity,
      ...values,
      createdBy: users.find(it => it.id.toString() === values.createdBy?.toString()),
      modifiedBy: users.find(it => it.id.toString() === values.modifiedBy?.toString()),
      customerLoan: customerLoans.find(it => it.id.toString() === values.customerLoan?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          insertTs: displayDefaultDateTime(),
          modifiedTs: displayDefaultDateTime(),
        }
      : {
          ...weeklyCollectionEntity,
          insertTs: convertDateTimeFromServer(weeklyCollectionEntity.insertTs),
          modifiedTs: convertDateTimeFromServer(weeklyCollectionEntity.modifiedTs),
          createdBy: weeklyCollectionEntity?.createdBy?.id,
          modifiedBy: weeklyCollectionEntity?.modifiedBy?.id,
          customerLoan: weeklyCollectionEntity?.customerLoan?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="microcreditclientApp.weeklyCollection.home.createOrEditLabel" data-cy="WeeklyCollectionCreateUpdateHeading">
            <Translate contentKey="microcreditclientApp.weeklyCollection.home.createOrEditLabel">
              Create or edit a WeeklyCollection
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="weekly-collection-id"
                  label={translate('microcreditclientApp.weeklyCollection.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('microcreditclientApp.weeklyCollection.description')}
                id="weekly-collection-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('microcreditclientApp.weeklyCollection.insertTs')}
                id="weekly-collection-insertTs"
                name="insertTs"
                data-cy="insertTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('microcreditclientApp.weeklyCollection.modifiedTs')}
                id="weekly-collection-modifiedTs"
                name="modifiedTs"
                data-cy="modifiedTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="weekly-collection-createdBy"
                name="createdBy"
                data-cy="createdBy"
                label={translate('microcreditclientApp.weeklyCollection.createdBy')}
                type="select"
              >
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="weekly-collection-modifiedBy"
                name="modifiedBy"
                data-cy="modifiedBy"
                label={translate('microcreditclientApp.weeklyCollection.modifiedBy')}
                type="select"
              >
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="weekly-collection-customerLoan"
                name="customerLoan"
                data-cy="customerLoan"
                label={translate('microcreditclientApp.weeklyCollection.customerLoan')}
                type="select"
              >
                <option value="" key="0" />
                {customerLoans
                  ? customerLoans.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/weekly-collection" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default WeeklyCollectionUpdate;
