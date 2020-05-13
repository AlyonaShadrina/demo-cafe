import { Button } from '@material-ui/core';
import React from 'react';

const AddCardButton = props => (
  <Button variant="contained" color="primary" size="small" className="noTextTransform" {...props}>
    + Add new card
  </Button>
);

export default AddCardButton;
