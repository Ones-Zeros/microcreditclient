// src/components/SaveButton.tsx
import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SaveButton = ({ updating }) => (
  <Button
    color="primary"
    id="save-entity"
    data-cy="entityCreateSaveButton"
    type="submit"
    disabled={updating}
    style={{ padding: '4px 8px', fontSize: '12px' }}
  >
    <FontAwesomeIcon icon="save" />
    &nbsp;Save
  </Button>
);

export default SaveButton;
