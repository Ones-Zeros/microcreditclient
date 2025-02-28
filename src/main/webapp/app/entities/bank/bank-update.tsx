import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { createEntity, getEntity, partialUpdateEntity, reset, updateEntity } from './bank.reducer';
import { Box, Typography } from '@mui/material';
import CancelButton from 'app/shared/Components/CancelButton';
import SaveButton from 'app/shared/Components/SaveButton';

export const BankUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [mode, setMode] = useState('');

  useEffect(() => {
    if (location.pathname.includes('/edit')) {
      setMode('edit');
    } else if (location.pathname.includes('/new')) {
      setMode('new');
    } else {
      setMode('view');
    }
  }, [location.pathname]);

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const bankEntity = useAppSelector(state => state.bank.entity);
  const loading = useAppSelector(state => state.bank.loading);
  const updating = useAppSelector(state => state.bank.updating);
  const updateSuccess = useAppSelector(state => state.bank.updateSuccess);

  const handleClose = () => {
    navigate(`/bank${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

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
    values.insertTs = convertDateTimeToServer(values.insertTs);
    values.modifiedTs = convertDateTimeToServer(values.modifiedTs);

    const entity = {
      ...bankEntity,
      ...values,
      createdBy: users.find(it => it.id.toString() === values.createdBy?.toString()),
      modifiedBy: users.find(it => it.id.toString() === values.modifiedBy?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(partialUpdateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          // insertTs: displayDefaultDateTime(),
          // modifiedTs: displayDefaultDateTime(),
        }
      : {
          ...bankEntity,
          // insertTs: convertDateTimeFromServer(bankEntity.insertTs),
          // modifiedTs: convertDateTimeFromServer(bankEntity.modifiedTs),
          // createdBy: bankEntity?.createdBy?.id,
          // modifiedBy: bankEntity?.modifiedBy?.id,
        };

  return (
    <Box m="20px">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h3" fontWeight="bold" sx={{ fontSize: '18px', paddingTop: '0px', paddingLeft: '20px', marginBottom: '10px' }}>
          {mode === 'new' ? 'Add Bank Data' : mode === 'edit' ? 'Edit Bank Data' : 'View Bank Data'}
        </Typography>
      </div>
      <hr></hr>
      <div>
        <Box
          sx={{
            backgroundColor: 'white', // White background
            borderRadius: '10px', // Rounded corners
            padding: '5px', // Padding to create space between border and content
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Optional: Adds a subtle shadow for depth
            marginTop: '10px', // Adds space between this box and the previous element
            marginLeft: '20px', // Adds space between this box and the left edge of the screen
          }}
        >
          <Row className="justify-content-center mt-3">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ValidatedForm className="row" defaultValues={defaultValues()} onSubmit={saveEntity}>
                {/* {!isNew ? (
                  <ValidatedField
                    name="id"
                    required
                    readOnly
                    id="bank-id"
                    label={translate('global.field.id')}
                    validate={{ required: true }}
                  />
                ) : null} */}
                <ValidatedField
                  row
                  style={{ fontSize: '12px' }}
                  label={translate('microcreditclientApp.bank.bankName')}
                  id="bank-bankName"
                  name="bankName"
                  data-cy="bankName"
                  className="col-md-12"
                  type="text"
                  validate={{
                    required: { value: true, message: translate('entity.validation.required') },
                  }}
                />
                {/* <ValidatedField
                  label={translate('microcreditclientApp.bank.insertTs')}
                  id="bank-insertTs"
                  name="insertTs"
                  className="col-md-4"
                  data-cy="insertTs"
                  disabled
                  type="datetime-local"
                  placeholder="YYYY-MM-DD HH:mm"
                />
                <ValidatedField
                  label={translate('microcreditclientApp.bank.modifiedTs')}
                  id="bank-modifiedTs"
                  name="modifiedTs"
                  data-cy="modifiedTs"
                  disabled
                  className="col-md-4"
                  type="datetime-local"
                  placeholder="YYYY-MM-DD HH:mm"
                />
                <ValidatedField
                  id="bank-createdBy"
                  row
                  name="createdBy"
                  className="col-md-4"
                  data-cy="createdBy"
                  label={translate('microcreditclientApp.bank.createdBy')}
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
                  id="bank-modifiedBy"
                  row
                  name="modifiedBy"
                  className="col-md-4"
                  data-cy="modifiedBy"
                  label={translate('microcreditclientApp.bank.modifiedBy')}
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
                </ValidatedField> */}
                <Row className="justify-content-end" style={{ marginTop: '30px' }}>
                  <Col md={12} className="d-flex justify-content-end">
                    {mode === 'new' || mode === 'view' ? <CancelButton to="/bank" /> : null}
                    &nbsp;
                    {!(mode !== 'edit' && mode !== 'new') || mode === 'new' || mode === 'edit' ? <SaveButton updating={updating} /> : null}
                  </Col>
                </Row>
                {/* <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/bank" replace color="info">
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
                </Button> */}
              </ValidatedForm>
            )}
          </Row>
        </Box>
      </div>
    </Box>
  );
};

export default BankUpdate;
