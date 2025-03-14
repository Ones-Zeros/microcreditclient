import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Translate, ValidatedBlobField, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { convertDateTimeToServer } from 'app/shared/util/date-utils';

import { Box, Typography } from '@mui/material';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { CustomerStatus } from 'app/shared/model/enumerations/customer-status.model';
import { createEntity, getEntity, reset, updateEntity } from './customer.reducer';
import CustomerTabSection from './customer-tab-section';
import CancelButton from 'app/shared/Components/CancelButton';
import SaveButton from 'app/shared/Components/SaveButton';

export const CustomerUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [mode, setMode] = useState('');

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const customerEntity = useAppSelector(state => state.customer.entity);
  const loading = useAppSelector(state => state.customer.loading);
  const updating = useAppSelector(state => state.customer.updating);
  const updateSuccess = useAppSelector(state => state.customer.updateSuccess);
  const customerStatusValues = Object.keys(CustomerStatus);

  const handleClose = () => {
    navigate(`/customer${location.search}`);
  };

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
    // if (values.id !== undefined && typeof values.id !== 'number') {
    //   values.id = Number(values.id);
    // }
    if (values.creditLimit !== undefined && typeof values.creditLimit !== 'number') {
      values.creditLimit = Number(values.creditLimit);
    }
    values.insertTs = convertDateTimeToServer(values.insertTs);
    values.modifiedTs = convertDateTimeToServer(values.modifiedTs);

    const entity = {
      ...customerEntity,
      ...values,
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
    !isNew && {
      status: 'ACTIVE',
      ...customerEntity,
    };

  return (
    <Box m="20px">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h3" fontWeight="bold" sx={{ fontSize: '18px', paddingTop: '0px', paddingLeft: '20px', marginBottom: '10px' }}>
          {mode === 'new' ? 'Add Customer' : mode === 'edit' ? 'Edit Customer' : 'View Customer'}
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
          <Row className="justify-content-start mt-3">
            <Col md="12">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ValidatedForm className="row" defaultValues={defaultValues()} onSubmit={saveEntity}>
                  {/* {!isNew ? (
                    <ValidatedField
                      name="id"
                      required
                      readOnly
                      id="customer-id"
                      label={translate('microcreditclientApp.customer.id')}
                      validate={{ required: true }}
                    />
                  ) : null} */}
                  <ValidatedField
                    row
                    label={translate('microcreditclientApp.customer.custId')}
                    id="customer-custId"
                    name="custId"
                    data-cy="custId"
                    className="col-md-3"
                    type="text"
                    validate={{
                      required: { value: true, message: translate('entity.validation.required') },
                    }}
                  />
                  <ValidatedField
                    row
                    label={translate('microcreditclientApp.customer.nic')}
                    id="customer-nic"
                    name="nic"
                    data-cy="nic"
                    className="col-md-3"
                    type="text"
                    validate={{
                      required: { value: true, message: translate('entity.validation.required') },
                    }}
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.customer.custName')}
                    id="customer-custName"
                    name="custName"
                    data-cy="custName"
                    type="text"
                    validate={{
                      required: { value: true, message: translate('entity.validation.required') },
                    }}
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.customer.address1')}
                    id="customer-address1"
                    name="address1"
                    data-cy="address1"
                    type="text"
                    validate={{
                      required: { value: true, message: translate('entity.validation.required') },
                    }}
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.customer.address2')}
                    id="customer-address2"
                    name="address2"
                    data-cy="address2"
                    type="text"
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.customer.city')}
                    id="customer-city"
                    name="city"
                    data-cy="city"
                    type="text"
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.customer.phone1')}
                    id="customer-phone1"
                    name="phone1"
                    data-cy="phone1"
                    type="text"
                    validate={{
                      required: { value: true, message: translate('entity.validation.required') },
                    }}
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.customer.phone2')}
                    id="customer-phone2"
                    name="phone2"
                    data-cy="phone2"
                    type="text"
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.customer.email')}
                    id="customer-email"
                    name="email"
                    data-cy="email"
                    type="text"
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.customer.creditLimit')}
                    id="customer-creditLimit"
                    name="creditLimit"
                    data-cy="creditLimit"
                    type="text"
                    validate={{
                      required: { value: true, message: translate('entity.validation.required') },
                      validate: v => isNumber(v) || translate('entity.validation.number'),
                    }}
                  />
                  <ValidatedBlobField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.customer.photo')}
                    id="customer-photo"
                    name="photo"
                    data-cy="photo"
                    openActionLabel={translate('entity.action.open')}
                    validate={{
                      required: { value: true, message: translate('entity.validation.required') },
                    }}
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.customer.status')}
                    id="customer-status"
                    name="status"
                    data-cy="status"
                    type="select"
                  >
                    {customerStatusValues.map(customerStatus => (
                      <option value={customerStatus} key={customerStatus}>
                        {translate(`microcreditclientApp.CustomerStatus.${customerStatus}`)}
                      </option>
                    ))}
                  </ValidatedField>
                  <Row className="justify-content-end" style={{ marginTop: '30px' }}>
                    <Col md={12} className="d-flex justify-content-end">
                      {mode === 'new' || mode === 'view' ? <CancelButton to="/customer" /> : null}
                      &nbsp;
                      {!(mode !== 'edit' && mode !== 'new') || mode === 'new' || mode === 'edit' ? (
                        <SaveButton updating={updating} />
                      ) : null}
                    </Col>
                  </Row>
                </ValidatedForm>
              )}
            </Col>
          </Row>
          <CustomerTabSection mode={mode} />
        </Box>
      </div>
    </Box>
  );
};

export default CustomerUpdate;
