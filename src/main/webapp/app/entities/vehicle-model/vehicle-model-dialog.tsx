import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { createEntityByVehicleBrand, getEntity, reset } from './vehicle-model.reducer';

export const VehicleModelDialog = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  // const users = useAppSelector(state => state.userManagement.users);
  // const travelRequests = useAppSelector(state => state.travelRequest.entities);
  // const travelPersonsEntity = useAppSelector(state => state.travelPersons.entity);
  // const loading = useAppSelector(state => state.travelPersons.loading);
  const updating = useAppSelector(state => state.vehicleModel.updating);
  const updateSuccess = useAppSelector(state => state.vehicleModel.updateSuccess);
  const brandId = useAppSelector(state => state.vehicleBrand.entity.id);
  const vehicleModelEntity = useAppSelector(state => state.vehicleModel.entity);
  const loading = useAppSelector(state => state.vehicleModel.loading);
  const [formMode, setFormMode] = useState('');
  // const [checkedForGuest, setCheckedForGuest] = useState(false);

  const handleClose = () => {
    navigate(`/vehicle-brand/${brandId}/edit` + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (location.pathname.includes('/edit')) {
      setFormMode('edit');
    } else if (location.pathname.includes('/new')) {
      setFormMode('new');
    } else {
      setFormMode('view');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = async values => {
    const entity = {
      ...vehicleModelEntity,
      ...values,
      vehicleBrand: { id: brandId },
    };

    if (isNew) {
      await dispatch(createEntityByVehicleBrand(entity));
      dispatch(getEntity(brandId)); // Refetch models for the selected brand
      handleClose();
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...vehicleModelEntity,
          VehicleBrand: vehicleModelEntity?.vehicleModel?.id,
        };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="VehicleModelDialog">
        {isNew ? 'Add Model' : 'Edit Model'}
      </ModalHeader>
      <ModalBody id="faoclientApp.travel.persons.add">
        <div>
          <Row className="justify-content-center">
            <Col md="8">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
                  <ValidatedField
                    label={translate('microcreditclientApp.vehicleModel.model')}
                    id="vehicle-model-model"
                    name="model"
                    data-cy="model"
                    type="text"
                    validate={{
                      required: { value: true, message: translate('entity.validation.required') },
                    }}
                  />
                  <ValidatedField
                    label={translate('microcreditclientApp.vehicleModel.description')}
                    id="vehicle-model-description"
                    name="description"
                    data-cy="description"
                    type="text"
                    validate={{
                      required: { value: true, message: translate('entity.validation.required') },
                    }}
                  />

                  <ModalFooter>
                    <Button color="info" onClick={handleClose}>
                      <FontAwesomeIcon icon="arrow-left" style={{ fontSize: '10px' }} /> Back
                    </Button>
                    &nbsp;
                    {formMode === 'edit' || formMode === 'new' ? (
                      <Button color="primary" type="submit" disabled={updating}>
                        <FontAwesomeIcon icon="save" style={{ fontSize: '12px' }} /> Save
                      </Button>
                    ) : null}
                  </ModalFooter>
                </ValidatedForm>
              )}
            </Col>
          </Row>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default VehicleModelDialog;
