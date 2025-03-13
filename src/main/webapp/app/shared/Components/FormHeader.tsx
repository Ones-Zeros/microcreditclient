import { Typography } from '@mui/material';
import React from 'react';
import { Row } from 'reactstrap';

function FormHeader({ title, status = null }) {
  return (
    <Row className="justify-content-center">
      <Typography variant="h3" fontWeight="bold" sx={{ fontSize: '18px', paddingTop: '0px', paddingLeft: '15px', marginBottom: '8px' }}>
        {title}
      </Typography>
      {status && <div style={{ textAlign: 'right', fontSize: '16px' }}></div>}
    </Row>
  );
}

export default FormHeader;
