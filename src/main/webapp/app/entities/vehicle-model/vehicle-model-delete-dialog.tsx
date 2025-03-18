/* eslint-disable @typescript-eslint/no-misused-promises */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Translate } from 'react-jhipster';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { deleteEntity, getEntity } from './vehicle-model.reducer';

export const VehicleModelDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, [dispatch, id]);

  const vehicleModelEntity = useAppSelector(state => state.vehicleModel.entity);
  const updateSuccess = useAppSelector(state => state.vehicleModel.updateSuccess);
  const brandId = useAppSelector(state => state.vehicleModel.entity?.vehicleBrand?.id);

  const handleClose = () => {
    navigate(`/vehicle-brand/${brandId}/edit${pageLocation.search}`);
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess, loadModal]);

  const confirmDelete = async () => {
    await dispatch(deleteEntity(vehicleModelEntity.id)); // Ensure deletion completes before navigating
    handleClose();
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="vehicleModelDeleteDialogHeading">
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="microcreditclientApp.vehicleModel.delete.question">
        <Translate contentKey="microcreditclientApp.vehicleModel.delete.question" interpolate={{ id: vehicleModelEntity.id }}>
          Are you sure you want to delete this VehicleModel?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-vehicleModel" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default VehicleModelDeleteDialog;
