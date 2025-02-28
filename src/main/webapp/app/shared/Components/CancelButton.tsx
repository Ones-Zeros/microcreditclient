// src/components/CancelButton.tsx
import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const CancelButton = ({ to }) => (
  <Button tag={Link} to={to} replace color="info" style={{ padding: '4px 10px', fontSize: '12px', marginLeft: '10px' }}>
    <FontAwesomeIcon icon="arrow-left" />
    &nbsp;
    <span className="d-none d-md-inline">Back</span>
  </Button>
);

export default CancelButton;
