import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntities as getBanks } from 'app/entities/bank/bank.reducer';
import { createEntity, getEntity, reset, updateEntity } from './bank-branch.reducer';
import { Box, Typography } from '@mui/material';
import CancelButton from 'app/shared/Components/CancelButton';
import SaveButton from 'app/shared/Components/SaveButton';

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
  const [mode, setMode] = useState('');
  const bankId = useAppSelector(state => state.bank.entity.id);

  const handleClose = () => {
    navigate(`/bank/${bankId}/edit`);
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
    if (location.pathname.includes('/edit')) {
      setMode('edit');
    } else if (location.pathname.includes('/new')) {
      setMode('new');
    } else {
      setMode('view');
    }
  }, [location.pathname]);
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
      bank: { id: bankId },
      createdBy: users.find(it => it.id.toString() === values.createdBy?.toString()),
      modifiedBy: users.find(it => it.id.toString() === values.modifiedBy?.toString()),
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
          bank: bankId,
        }
      : {
          ...bankBranchEntity,
          insertTs: convertDateTimeFromServer(bankBranchEntity.insertTs),
          modifiedTs: convertDateTimeFromServer(bankBranchEntity.modifiedTs),
          createdBy: bankBranchEntity?.createdBy?.id,
          modifiedBy: bankBranchEntity?.modifiedBy?.id,
          bank: bankBranchEntity?.bank?.id || bankId,
        };

  return (
    <Box m="20px">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h3" fontWeight="bold" sx={{ fontSize: '18px', paddingTop: '0px', paddingLeft: '20px', marginBottom: '10px' }}>
          <Translate contentKey="microcreditclientApp.bankBranch.home.createOrEditLabel">Create or edit a BankBranch</Translate>
        </Typography>
      </div>
      <hr />
      <div>
        <Box
          sx={{
            backgroundColor: 'white', // White background
            borderRadius: '10px', // Rounded corners
            padding: '10px', // Padding to create space between border and content
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Optional: Adds a subtle shadow for depth
            marginTop: '10px', // Adds space between this box and the previous element
            marginLeft: '20px', // Adds space between this box and the left edge of the screen
          }}
        >
          <Row className="justify-content-start mt-3">
            <Col md="12">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ValidatedForm className="row" defaultValues={defaultValues()} onSubmit={saveEntity}>
                  {!isNew ? (
                    <ValidatedField
                      row
                      className="col-md-3"
                      name="id"
                      required
                      readOnly
                      id="bank-branch-id"
                      label={translate('global.field.id')}
                      validate={{ required: true }}
                    />
                  ) : null}
                  <ValidatedField
                    row
                    className="col-md-3"
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
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.bankBranch.branchId')}
                    id="bank-branch-branchId"
                    name="branchId"
                    data-cy="branchId"
                    type="text"
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.bankBranch.branchLocation')}
                    id="bank-branch-branchLocation"
                    name="branchLocation"
                    data-cy="branchLocation"
                    type="text"
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.bankBranch.insertTs')}
                    id="bank-branch-insertTs"
                    name="insertTs"
                    data-cy="insertTs"
                    type="datetime-local"
                    placeholder="YYYY-MM-DD HH:mm"
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.bankBranch.modifiedTs')}
                    id="bank-branch-modifiedTs"
                    name="modifiedTs"
                    data-cy="modifiedTs"
                    type="datetime-local"
                    placeholder="YYYY-MM-DD HH:mm"
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
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
                    row
                    className="col-md-3"
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
                  {/* <ValidatedField
                    row
                    className="col-md-3"
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
                  </ValidatedField> */}
                  <Row className="justify-content-end" style={{ marginTop: '30px' }}>
                    <Col md={12} className="d-flex justify-content-end">
                      {(mode === 'new' || mode === 'view' || mode === 'edit') && <CancelButton to={`/bank/${bankId}/edit`} />}
                      &nbsp;
                      {(mode === 'new' || mode === 'edit') && <SaveButton updating={updating} />}
                    </Col>
                  </Row>
                </ValidatedForm>
              )}
            </Col>
          </Row>
        </Box>
      </div>
    </Box>
  );
};

export default BankBranchUpdate;
