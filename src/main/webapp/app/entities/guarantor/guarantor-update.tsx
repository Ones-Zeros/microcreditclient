import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedBlobField, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getCustomerLoans } from 'app/entities/customer-loan/customer-loan.reducer';
import { createEntity, getEntity, reset, updateEntity } from './guarantor.reducer';
import { Box, Typography } from '@mui/material';
import CancelButton from 'app/shared/Components/CancelButton';
import SaveButton from 'app/shared/Components/SaveButton';

export const GuarantorUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;
  const [mode, setMode] = useState('');
  const customerLoans = useAppSelector(state => state.customerLoan.entities);
  const guarantorEntity = useAppSelector(state => state.guarantor.entity);
  const loading = useAppSelector(state => state.guarantor.loading);
  const updating = useAppSelector(state => state.guarantor.updating);
  const updateSuccess = useAppSelector(state => state.guarantor.updateSuccess);

  const handleClose = () => {
    navigate(`/guarantor${location.search}`);
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
      ...guarantorEntity,
      ...values,
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
          // insertTs: displayDefaultDateTime(),
          // modifiedTs: displayDefaultDateTime(),
        }
      : {
          ...guarantorEntity,
          // insertTs: convertDateTimeFromServer(guarantorEntity.insertTs),
          // modifiedTs: convertDateTimeFromServer(guarantorEntity.modifiedTs),
          // customerLoan: guarantorEntity?.customerLoan?.id,
        };

  return (
    <Box m="20px">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h3" fontWeight="bold" sx={{ fontSize: '18px', paddingTop: '0px', paddingLeft: '20px', marginBottom: '10px' }}>
          {mode === 'new' ? 'Add Guarantor' : mode === 'edit' ? 'Edit Guarantor' : 'View Guarantor'}
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
                  id="guarantor-id"
                  label={translate('microcreditclientApp.guarantor.id')}
                  validate={{ required: true }}
                />
              ) : null} */}
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.guarantor.nic')}
                    id="guarantor-nic"
                    name="nic"
                    data-cy="nic"
                    type="text"
                    validate={{
                      required: { value: true, message: translate('entity.validation.required') },
                    }}
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.guarantor.guarantorName')}
                    id="guarantor-guarantorName"
                    name="guarantorName"
                    data-cy="guarantorName"
                    type="text"
                    validate={{
                      required: { value: true, message: translate('entity.validation.required') },
                    }}
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.guarantor.phone1')}
                    id="guarantor-phone1"
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
                    label={translate('microcreditclientApp.guarantor.address1')}
                    id="guarantor-address1"
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
                    label={translate('microcreditclientApp.guarantor.address2')}
                    id="guarantor-address2"
                    name="address2"
                    data-cy="address2"
                    type="text"
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.guarantor.city')}
                    id="guarantor-city"
                    name="city"
                    data-cy="city"
                    type="text"
                  />
                  <ValidatedBlobField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.guarantor.picture')}
                    id="guarantor-picture"
                    name="picture"
                    data-cy="picture"
                    openActionLabel={translate('entity.action.open')}
                    validate={{
                      required: { value: true, message: translate('entity.validation.required') },
                    }}
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.guarantor.insertTs')}
                    id="guarantor-insertTs"
                    name="insertTs"
                    data-cy="insertTs"
                    type="datetime-local"
                    placeholder="YYYY-MM-DD HH:mm"
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    label={translate('microcreditclientApp.guarantor.modifiedTs')}
                    id="guarantor-modifiedTs"
                    name="modifiedTs"
                    data-cy="modifiedTs"
                    type="datetime-local"
                    placeholder="YYYY-MM-DD HH:mm"
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    id="guarantor-customerLoan"
                    name="customerLoan"
                    data-cy="customerLoan"
                    label={translate('microcreditclientApp.guarantor.customerLoan')}
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
                  <Row className="justify-content-end" style={{ marginTop: '30px' }}>
                    <Col md={12} className="d-flex justify-content-end">
                      {mode === 'new' || mode === 'view' || mode === 'edit' ? <CancelButton to="/guarantor" /> : null}
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
        </Box>
      </div>
    </Box>
  );
};

export default GuarantorUpdate;
