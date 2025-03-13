import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row } from 'reactstrap';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { convertDateTimeToServer } from 'app/shared/util/date-utils';

import { Box } from '@mui/material';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import FormHeader from 'app/shared/Components/FormHeader';
import { createEntity, getEntity, reset, updateEntity } from './vehicle-brand.reducer';
import VehicleTabSection from './vehicle-tab-section';

export const VehicleBrandUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const vehicleBrandEntity = useAppSelector(state => state.vehicleBrand.entity);
  const loading = useAppSelector(state => state.vehicleBrand.loading);
  const updating = useAppSelector(state => state.vehicleBrand.updating);
  const updateSuccess = useAppSelector(state => state.vehicleBrand.updateSuccess);

  const handleClose = () => {
    navigate(`/vehicle-brand${location.search}`);
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
      ...vehicleBrandEntity,
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
    isNew
      ? {
          // insertTs: displayDefaultDateTime(),
          // modifiedTs: displayDefaultDateTime(),
        }
      : {
          ...vehicleBrandEntity,
        };

  return (
    <Box m="20px">
      <div>
        <FormHeader title="Create or edit a VehicleBrand" />
        <hr />
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
          <Box sx={{ alignItems: 'center' }}>
            <Row className="justify-content-center mt-3">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
                  {/* {!isNew ? (
                    <ValidatedField
                      name="id"
                      required
                      className="col-md-1"
                      readOnly
                      id="vehicle-brand-id"
                      label={translate('microcreditclientApp.vehicleBrand.id')}
                      validate={{ required: true }}
                    />
                  ) : null} */}
                  <ValidatedField
                    row
                    label={translate('microcreditclientApp.vehicleBrand.brand')}
                    id="vehicle-brand-brand"
                    name="brand"
                    className="col-md-3"
                    data-cy="brand"
                    type="text"
                    validate={{
                      required: { value: true, message: translate('entity.validation.required') },
                    }}
                  />
                  <ValidatedField
                    label={translate('microcreditclientApp.vehicleBrand.description')}
                    id="vehicle-brand-description"
                    row
                    name="description"
                    className="col-md-6"
                    data-cy="description"
                    type="text"
                    validate={{
                      required: { value: true, message: translate('entity.validation.required') },
                    }}
                  />
                  <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/vehicle-brand" replace color="info">
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
            </Row>
            <VehicleTabSection mode="new" />
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default VehicleBrandUpdate;
