import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedBlobField, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getCustomerLoans } from 'app/entities/customer-loan/customer-loan.reducer';
import { createEntity, getEntity, reset, updateEntity } from './guarantor.reducer';

export const GuarantorUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const customerLoans = useAppSelector(state => state.customerLoan.entities);
  const guarantorEntity = useAppSelector(state => state.guarantor.entity);
  const loading = useAppSelector(state => state.guarantor.loading);
  const updating = useAppSelector(state => state.guarantor.updating);
  const updateSuccess = useAppSelector(state => state.guarantor.updateSuccess);

  const handleClose = () => {
    navigate(`/guarantor${location.search}`);
  };

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
          insertTs: displayDefaultDateTime(),
          modifiedTs: displayDefaultDateTime(),
        }
      : {
          ...guarantorEntity,
          insertTs: convertDateTimeFromServer(guarantorEntity.insertTs),
          modifiedTs: convertDateTimeFromServer(guarantorEntity.modifiedTs),
          customerLoan: guarantorEntity?.customerLoan?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="microcreditclientApp.guarantor.home.createOrEditLabel" data-cy="GuarantorCreateUpdateHeading">
            <Translate contentKey="microcreditclientApp.guarantor.home.createOrEditLabel">Create or edit a Guarantor</Translate>
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
                  id="guarantor-id"
                  label={translate('microcreditclientApp.guarantor.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
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
                label={translate('microcreditclientApp.guarantor.address2')}
                id="guarantor-address2"
                name="address2"
                data-cy="address2"
                type="text"
              />
              <ValidatedField
                label={translate('microcreditclientApp.guarantor.city')}
                id="guarantor-city"
                name="city"
                data-cy="city"
                type="text"
              />
              <ValidatedBlobField
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
                label={translate('microcreditclientApp.guarantor.insertTs')}
                id="guarantor-insertTs"
                name="insertTs"
                data-cy="insertTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('microcreditclientApp.guarantor.modifiedTs')}
                id="guarantor-modifiedTs"
                name="modifiedTs"
                data-cy="modifiedTs"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/guarantor" replace color="info">
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

export default GuarantorUpdate;
