import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getBankBranches } from 'app/entities/bank-branch/bank-branch.reducer';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { createEntity, getEntity, reset, updateEntity } from './customer-bank-info.reducer';
import CancelButton from 'app/shared/Components/CancelButton';
import SaveButton from 'app/shared/Components/SaveButton';
import { Box, Typography } from '@mui/material';

export const CustomerBankInfoUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const bankBranches = useAppSelector(state => state.bankBranch.entities);
  const customers = useAppSelector(state => state.customer.entities);
  const customerBankInfoEntity = useAppSelector(state => state.customerBankInfo.entity);
  const loading = useAppSelector(state => state.customerBankInfo.loading);
  const updating = useAppSelector(state => state.customerBankInfo.updating);
  const updateSuccess = useAppSelector(state => state.customerBankInfo.updateSuccess);
  const customerId = useAppSelector(state => state.customer.entity.id);
  const [mode, setMode] = useState('');
  const handleClose = () => {
    navigate(`/customer/${customerId}/edit`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getBankBranches({}));
    dispatch(getCustomers({}));
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
      ...customerBankInfoEntity,
      ...values,
      customer: { id: customerId },
      bankBranch: bankBranches.find(it => it.id.toString() === values.bankBranch?.toString()),
      // customer: customers.find(it => it.id.toString() === values.customer?.toString()),
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
          customer: { id: customerId },
        }
      : {
          ...customerBankInfoEntity,
          insertTs: convertDateTimeFromServer(customerBankInfoEntity.insertTs),
          modifiedTs: convertDateTimeFromServer(customerBankInfoEntity.modifiedTs),
          bankBranch: customerBankInfoEntity?.bankBranch?.id,
          customer: customerBankInfoEntity?.customer?.id,
        };

  return (
    <Box m="20px">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h3" fontWeight="bold" sx={{ fontSize: '18px', paddingTop: '0px', paddingLeft: '20px', marginBottom: '10px' }}>
          {mode === 'new' ? 'Add CustomerBankInfo' : mode === 'edit' ? 'Edit CustomerBankInfo' : 'View CustomerBankInfo'}
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
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.customerBankInfo.accountNumber')}
                    id="customer-bank-info-accountNumber"
                    name="accountNumber"
                    data-cy="accountNumber"
                    type="text"
                    validate={{
                      required: { value: true, message: translate('entity.validation.required') },
                    }}
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.customerBankInfo.insertTs')}
                    id="customer-bank-info-insertTs"
                    name="insertTs"
                    data-cy="insertTs"
                    type="datetime-local"
                    placeholder="YYYY-MM-DD HH:mm"
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.customerBankInfo.modifiedTs')}
                    id="customer-bank-info-modifiedTs"
                    name="modifiedTs"
                    data-cy="modifiedTs"
                    type="datetime-local"
                    placeholder="YYYY-MM-DD HH:mm"
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    id="customer-bank-info-bankBranch"
                    name="bankBranch"
                    data-cy="bankBranch"
                    label={translate('microcreditclientApp.customerBankInfo.bankBranch')}
                    type="select"
                  >
                    <option value="" key="0" />
                    {bankBranches
                      ? bankBranches.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </ValidatedField>
                  {/* <ValidatedField
                id="customer-bank-info-customer"
                name="customer"
                data-cy="customer"
                label={translate('microcreditclientApp.customerBankInfo.customer')}
                type="select"
              >
                <option value="" key="0" />
                {customers
                  ? customers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField> */}
                  <Row className="justify-content-end" style={{ marginTop: '30px' }}>
                    <Col md={12} className="d-flex justify-content-end">
                      {(mode === 'new' || mode === 'view' || mode === 'edit') && <CancelButton to={`/customer/${customerId}/edit`} />}
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

export default CustomerBankInfoUpdate;
