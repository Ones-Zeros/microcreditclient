import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntities as getBanks } from 'app/entities/bank/bank.reducer';
import { createEntity, getEntity, reset, updateEntity } from './bank-branch.reducer';

export const BankBranchUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const banks = useAppSelector(state => state.bank.entities);
  const bankBranchEntity = useAppSelector(state => state.bankBranch.entity);
  const loading = useAppSelector(state => state.bankBranch.loading);
  const updating = useAppSelector(state => state.bankBranch.updating);
  const updateSuccess = useAppSelector(state => state.bankBranch.updateSuccess);

  const handleClose = () => {
    navigate(`/bank-branch${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
    dispatch(getBanks({}));
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
      ...bankBranchEntity,
      ...values,
      createdBy: users.find(it => it.id.toString() === values.createdBy?.toString()),
      modifiedBy: users.find(it => it.id.toString() === values.modifiedBy?.toString()),
      bank: banks.find(it => it.id.toString() === values.bank?.toString()),
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
          ...bankBranchEntity,
          insertTs: convertDateTimeFromServer(bankBranchEntity.insertTs),
          modifiedTs: convertDateTimeFromServer(bankBranchEntity.modifiedTs),
          createdBy: bankBranchEntity?.createdBy?.id,
          modifiedBy: bankBranchEntity?.modifiedBy?.id,
          bank: bankBranchEntity?.bank?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="microcreditclientApp.bankBranch.home.createOrEditLabel" data-cy="BankBranchCreateUpdateHeading">
            <Translate contentKey="microcreditclientApp.bankBranch.home.createOrEditLabel">Create or edit a BankBranch</Translate>
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
                  id="bank-branch-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('microcreditclientApp.bankBranch.branchName')}
                id="bank-branch-branchName"
                name="branchName"
                data-cy="branchName"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('microcreditclientApp.bankBranch.branchId')}
                id="bank-branch-branchId"
                name="branchId"
                data-cy="branchId"
                type="text"
              />
              <ValidatedField
                label={translate('microcreditclientApp.bankBranch.branchLocation')}
                id="bank-branch-branchLocation"
                name="branchLocation"
                data-cy="branchLocation"
                type="text"
              />
              <ValidatedField
                label={translate('microcreditclientApp.bankBranch.insertTs')}
                id="bank-branch-insertTs"
                name="insertTs"
                data-cy="insertTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('microcreditclientApp.bankBranch.modifiedTs')}
                id="bank-branch-modifiedTs"
                name="modifiedTs"
                data-cy="modifiedTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="bank-branch-createdBy"
                name="createdBy"
                data-cy="createdBy"
                label={translate('microcreditclientApp.bankBranch.createdBy')}
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
                id="bank-branch-modifiedBy"
                name="modifiedBy"
                data-cy="modifiedBy"
                label={translate('microcreditclientApp.bankBranch.modifiedBy')}
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
                id="bank-branch-bank"
                name="bank"
                data-cy="bank"
                label={translate('microcreditclientApp.bankBranch.bank')}
                type="select"
              >
                <option value="" key="0" />
                {banks
                  ? banks.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/bank-branch" replace color="info">
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

export default BankBranchUpdate;
