import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getInstallmentPlanItems } from 'app/entities/installment-plan-item/installment-plan-item.reducer';
import { getEntities as getWeeklyCollections } from 'app/entities/weekly-collection/weekly-collection.reducer';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { createEntity, getEntity, reset, updateEntity } from './weekly-collection-item.reducer';

export const WeeklyCollectionItemUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const installmentPlanItems = useAppSelector(state => state.installmentPlanItem.entities);
  const weeklyCollections = useAppSelector(state => state.weeklyCollection.entities);
  const users = useAppSelector(state => state.userManagement.users);
  const weeklyCollectionItemEntity = useAppSelector(state => state.weeklyCollectionItem.entity);
  const loading = useAppSelector(state => state.weeklyCollectionItem.loading);
  const updating = useAppSelector(state => state.weeklyCollectionItem.updating);
  const updateSuccess = useAppSelector(state => state.weeklyCollectionItem.updateSuccess);

  const handleClose = () => {
    navigate(`/weekly-collection-item${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getInstallmentPlanItems({}));
    dispatch(getWeeklyCollections({}));
    dispatch(getUsers({}));
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
    if (values.amountToBePaid !== undefined && typeof values.amountToBePaid !== 'number') {
      values.amountToBePaid = Number(values.amountToBePaid);
    }
    if (values.amountPaid !== undefined && typeof values.amountPaid !== 'number') {
      values.amountPaid = Number(values.amountPaid);
    }
    values.insertTs = convertDateTimeToServer(values.insertTs);
    values.modifiedTs = convertDateTimeToServer(values.modifiedTs);

    const entity = {
      ...weeklyCollectionItemEntity,
      ...values,
      installmentPlanItem: installmentPlanItems.find(it => it.id.toString() === values.installmentPlanItem?.toString()),
      weeklyCollection: weeklyCollections.find(it => it.id.toString() === values.weeklyCollection?.toString()),
      createdBy: users.find(it => it.id.toString() === values.createdBy?.toString()),
      updatedBy: users.find(it => it.id.toString() === values.updatedBy?.toString()),
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
          ...weeklyCollectionItemEntity,
          insertTs: convertDateTimeFromServer(weeklyCollectionItemEntity.insertTs),
          modifiedTs: convertDateTimeFromServer(weeklyCollectionItemEntity.modifiedTs),
          installmentPlanItem: weeklyCollectionItemEntity?.installmentPlanItem?.id,
          weeklyCollection: weeklyCollectionItemEntity?.weeklyCollection?.id,
          createdBy: weeklyCollectionItemEntity?.createdBy?.id,
          updatedBy: weeklyCollectionItemEntity?.updatedBy?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="microcreditclientApp.weeklyCollectionItem.home.createOrEditLabel" data-cy="WeeklyCollectionItemCreateUpdateHeading">
            <Translate contentKey="microcreditclientApp.weeklyCollectionItem.home.createOrEditLabel">
              Create or edit a WeeklyCollectionItem
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
                  id="weekly-collection-item-id"
                  label={translate('microcreditclientApp.weeklyCollectionItem.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('microcreditclientApp.weeklyCollectionItem.amountToBePaid')}
                id="weekly-collection-item-amountToBePaid"
                name="amountToBePaid"
                data-cy="amountToBePaid"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.weeklyCollectionItem.amountPaid')}
                id="weekly-collection-item-amountPaid"
                name="amountPaid"
                data-cy="amountPaid"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.weeklyCollectionItem.note')}
                id="weekly-collection-item-note"
                name="note"
                data-cy="note"
                type="text"
              />
              <ValidatedField
                label={translate('microcreditclientApp.weeklyCollectionItem.insertTs')}
                id="weekly-collection-item-insertTs"
                name="insertTs"
                data-cy="insertTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('microcreditclientApp.weeklyCollectionItem.modifiedTs')}
                id="weekly-collection-item-modifiedTs"
                name="modifiedTs"
                data-cy="modifiedTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="weekly-collection-item-installmentPlanItem"
                name="installmentPlanItem"
                data-cy="installmentPlanItem"
                label={translate('microcreditclientApp.weeklyCollectionItem.installmentPlanItem')}
                type="select"
              >
                <option value="" key="0" />
                {installmentPlanItems
                  ? installmentPlanItems.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="weekly-collection-item-weeklyCollection"
                name="weeklyCollection"
                data-cy="weeklyCollection"
                label={translate('microcreditclientApp.weeklyCollectionItem.weeklyCollection')}
                type="select"
              >
                <option value="" key="0" />
                {weeklyCollections
                  ? weeklyCollections.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="weekly-collection-item-createdBy"
                name="createdBy"
                data-cy="createdBy"
                label={translate('microcreditclientApp.weeklyCollectionItem.createdBy')}
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
                id="weekly-collection-item-updatedBy"
                name="updatedBy"
                data-cy="updatedBy"
                label={translate('microcreditclientApp.weeklyCollectionItem.updatedBy')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/weekly-collection-item" replace color="info">
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

export default WeeklyCollectionItemUpdate;
