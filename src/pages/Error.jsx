import { Typography, Box } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';

import { notifications } from '../dictionary';

const Error = () => {
  const { status } = useParams();

  return (
    <div className="loadingErrorContainer">
      <Box mb={1}>
        <Typography>This is error page.</Typography>
      </Box>
      <Typography variant="h2" component="h1" color="primary">
        {status}
      </Typography>
      <Box mb={4} mt={1}>
        <Typography>
          {notifications.errors.server[status]
            ? notifications.errors.server[status]
            : notifications.errors.default}
        </Typography>
      </Box>
    </div>
  );
};

export default Error;
