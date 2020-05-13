import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

const Loading = () => (
  <div className="loadingErrorContainer">
    <CircularProgress disableShrink />
  </div>
);

export default Loading;
