import React, { useEffect, useState } from 'react';
import { ValidatedField, ValidatedForm, isEmail, translate } from 'react-jhipster';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, FormText, Row } from 'reactstrap';

import { Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { languages, locales } from 'app/config/translation';
import CancelButton from 'app/shared/Components/CancelButton';
import SaveButton from 'app/shared/Components/SaveButton';
import { createUser, getRoles, getUser, reset, updateUser } from './user-management.reducer';

export const UserManagementUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [mode, setMode] = useState('');
  const { login } = useParams<'login'>();
  const isNew = login === undefined;

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
      dispatch(getUser(login));
    }
    dispatch(getRoles());
    return () => {
      dispatch(reset());
    };
  }, [login]);

  const handleClose = () => {
    navigate('/admin/user-management');
  };

  const saveUser = values => {
    if (isNew) {
      dispatch(createUser(values));
    } else {
      dispatch(updateUser(values));
    }
    handleClose();
  };

  const isInvalid = false;
  const user = useAppSelector(state => state.userManagement.user);
  const loading = useAppSelector(state => state.userManagement.loading);
  const updating = useAppSelector(state => state.userManagement.updating);
  const authorities = useAppSelector(state => state.userManagement.authorities);

  return (
    <Box m="20px">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h3" fontWeight="bold" sx={{ fontSize: '18px', paddingTop: '0px', paddingLeft: '20px', marginBottom: '10px' }}>
          {mode === 'new' ? 'Add User' : mode === 'edit' ? 'Edit User' : 'View User'}
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
                <ValidatedForm onSubmit={saveUser} className="row" defaultValues={user}>
                  {user.id ? (
                    <ValidatedField
                      row
                      className="col-md-3"
                      type="text"
                      name="id"
                      required
                      readOnly
                      label={translate('global.field.id')}
                      validate={{ required: true }}
                    />
                  ) : null}
                  <ValidatedField
                    row
                    className="col-md-3"
                    type="text"
                    name="login"
                    label={translate('userManagement.login')}
                    validate={{
                      required: {
                        value: true,
                        message: translate('register.messages.validate.login.required'),
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                        message: translate('register.messages.validate.login.pattern'),
                      },
                      minLength: {
                        value: 1,
                        message: translate('register.messages.validate.login.minlength'),
                      },
                      maxLength: {
                        value: 50,
                        message: translate('register.messages.validate.login.maxlength'),
                      },
                    }}
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    type="text"
                    name="firstName"
                    label={translate('userManagement.firstName')}
                    validate={{
                      maxLength: {
                        value: 50,
                        message: translate('entity.validation.maxlength', { max: 50 }),
                      },
                    }}
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    type="text"
                    name="lastName"
                    label={translate('userManagement.lastName')}
                    validate={{
                      maxLength: {
                        value: 50,
                        message: translate('entity.validation.maxlength', { max: 50 }),
                      },
                    }}
                  />
                  <FormText>This field cannot be longer than 50 characters.</FormText>
                  <ValidatedField
                    row
                    className="col-md-3"
                    name="email"
                    label={translate('global.form.email.label')}
                    placeholder={translate('global.form.email.placeholder')}
                    type="email"
                    validate={{
                      required: {
                        value: true,
                        message: translate('global.messages.validate.email.required'),
                      },
                      minLength: {
                        value: 5,
                        message: translate('global.messages.validate.email.minlength'),
                      },
                      maxLength: {
                        value: 254,
                        message: translate('global.messages.validate.email.maxlength'),
                      },
                      validate: v => isEmail(v) || translate('global.messages.validate.email.invalid'),
                    }}
                  />
                  <ValidatedField
                    row
                    className="col-md-3"
                    type="checkbox"
                    name="activated"
                    check
                    value={true}
                    disabled={!user.id}
                    label={translate('userManagement.activated')}
                  />
                  <ValidatedField row className="col-md-3" type="select" name="langKey" label={translate('userManagement.langKey')}>
                    {locales.map(locale => (
                      <option value={locale} key={locale}>
                        {languages[locale].name}
                      </option>
                    ))}
                  </ValidatedField>
                  <ValidatedField
                    row
                    className="col-md-3"
                    type="select"
                    name="authorities"
                    multiple
                    label={translate('userManagement.profiles')}
                  >
                    {authorities.map(role => (
                      <option value={role} key={role}>
                        {role}
                      </option>
                    ))}
                  </ValidatedField>
                  <Row className="justify-content-end" style={{ marginTop: '30px' }}>
                    <Col md={12} className="d-flex justify-content-end">
                      {mode === 'new' || mode === 'view' || mode === 'edit' ? <CancelButton to="/admin/user-management" /> : null}
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

export default UserManagementUpdate;
