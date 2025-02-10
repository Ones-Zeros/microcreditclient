import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntities as getCollectorRoutes } from 'app/entities/collector-route/collector-route.reducer';
import { getEntities as getWeeklyCollections } from 'app/entities/weekly-collection/weekly-collection.reducer';
import { createEntity, getEntity, reset, updateEntity } from './collector-collection-route.reducer';

export const CollectorCollectionRouteUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const collectorRoutes = useAppSelector(state => state.collectorRoute.entities);
  const weeklyCollections = useAppSelector(state => state.weeklyCollection.entities);
  const collectorCollectionRouteEntity = useAppSelector(state => state.collectorCollectionRoute.entity);
  const loading = useAppSelector(state => state.collectorCollectionRoute.loading);
  const updating = useAppSelector(state => state.collectorCollectionRoute.updating);
  const updateSuccess = useAppSelector(state => state.collectorCollectionRoute.updateSuccess);

  const handleClose = () => {
    navigate(`/collector-collection-route${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
    dispatch(getCollectorRoutes({}));
    dispatch(getWeeklyCollections({}));
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
    if (values.routeId !== undefined && typeof values.routeId !== 'number') {
      values.routeId = Number(values.routeId);
    }
    if (values.collectorId !== undefined && typeof values.collectorId !== 'number') {
      values.collectorId = Number(values.collectorId);
    }
    values.insertTs = convertDateTimeToServer(values.insertTs);
    values.modifiedTs = convertDateTimeToServer(values.modifiedTs);

    const entity = {
      ...collectorCollectionRouteEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user?.toString()),
      collectorRoute: collectorRoutes.find(it => it.id.toString() === values.collectorRoute?.toString()),
      weeklyCollection: weeklyCollections.find(it => it.id.toString() === values.weeklyCollection?.toString()),
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
          ...collectorCollectionRouteEntity,
          insertTs: convertDateTimeFromServer(collectorCollectionRouteEntity.insertTs),
          modifiedTs: convertDateTimeFromServer(collectorCollectionRouteEntity.modifiedTs),
          user: collectorCollectionRouteEntity?.user?.id,
          collectorRoute: collectorCollectionRouteEntity?.collectorRoute?.id,
          weeklyCollection: collectorCollectionRouteEntity?.weeklyCollection?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="microcreditclientApp.collectorCollectionRoute.home.createOrEditLabel"
            data-cy="CollectorCollectionRouteCreateUpdateHeading"
          >
            <Translate contentKey="microcreditclientApp.collectorCollectionRoute.home.createOrEditLabel">
              Create or edit a CollectorCollectionRoute
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
                  id="collector-collection-route-id"
                  label={translate('microcreditclientApp.collectorCollectionRoute.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('microcreditclientApp.collectorCollectionRoute.routeId')}
                id="collector-collection-route-routeId"
                name="routeId"
                data-cy="routeId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.collectorCollectionRoute.collectorId')}
                id="collector-collection-route-collectorId"
                name="collectorId"
                data-cy="collectorId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.collectorCollectionRoute.startDate')}
                id="collector-collection-route-startDate"
                name="startDate"
                data-cy="startDate"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.collectorCollectionRoute.endDate')}
                id="collector-collection-route-endDate"
                name="endDate"
                data-cy="endDate"
                type="date"
              />
              <ValidatedField
                label={translate('microcreditclientApp.collectorCollectionRoute.insertTs')}
                id="collector-collection-route-insertTs"
                name="insertTs"
                data-cy="insertTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('microcreditclientApp.collectorCollectionRoute.modifiedTs')}
                id="collector-collection-route-modifiedTs"
                name="modifiedTs"
                data-cy="modifiedTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="collector-collection-route-user"
                name="user"
                data-cy="user"
                label={translate('microcreditclientApp.collectorCollectionRoute.user')}
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
                id="collector-collection-route-collectorRoute"
                name="collectorRoute"
                data-cy="collectorRoute"
                label={translate('microcreditclientApp.collectorCollectionRoute.collectorRoute')}
                type="select"
              >
                <option value="" key="0" />
                {collectorRoutes
                  ? collectorRoutes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="collector-collection-route-weeklyCollection"
                name="weeklyCollection"
                data-cy="weeklyCollection"
                label={translate('microcreditclientApp.collectorCollectionRoute.weeklyCollection')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/collector-collection-route" replace color="info">
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

export default CollectorCollectionRouteUpdate;
