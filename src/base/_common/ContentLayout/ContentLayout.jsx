import { Box, Button, Grid } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';

import arrowBack from '../../../assets/images/arrow-back.svg';

const ContentLayout = ({ children, submitButtonText, cancelButtonProps, submitButtonProps }) => (
  <>
    <Box mb={2}>
      <Button
        variant="contained"
        color="primary"
        className="minWidth130"
        startIcon={(
          <img
            src={arrowBack}
            alt=""
            style={{
              maxWidth: 15,
              position: 'absolute',
              left: 11,
              top: 11,
            }}
          />
        )}
      >
        Back
      </Button>
    </Box>
    {children}
    <Grid container justify="flex-end" component={Box} mt={2}>
      <div>
        <Button
          size="small"
          variant="outlined"
          component={Box}
          border="2px solid white !important"
          marginRight="8px !important"
          {...cancelButtonProps}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className="minWidth130"
          {...submitButtonProps}
        >
          {submitButtonText}
        </Button>
      </div>
    </Grid>
  </>
);

ContentLayout.defaultProps = {
  cancelButtonProps: {},
  submitButtonProps: {},
  submitButtonText: 'Save',
};

ContentLayout.propTypes = {
  children: PropTypes.node.isRequired,
  submitButtonText: PropTypes.string,
  cancelButtonProps: PropTypes.shape(PropTypes.any),
  submitButtonProps: PropTypes.shape(PropTypes.any),
};

export default ContentLayout;
