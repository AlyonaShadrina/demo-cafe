import { Box, Grid, Paper, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Loading from '../../../_common/Loading';

const OrderInfo = ({ invoiceToItems, total }) => (
  <Paper component={Box} p={5}>
    <Typography component="div" color="primary">
      <Typography variant="h1" className="accentFont" color="primary">
        <Box fontSize={60} mb={5}>
          ORDER
        </Box>
      </Typography>
      <Grid container component={Box} fontSize={14}>
        {!total ? (
          <Loading />
        ) : (
          <>
            {invoiceToItems?.map((item, i) => (
              <Fragment key={i}>
                <Grid item xs={8}>
                  {item.item.name}
                </Grid>
                <Grid item xs={4}>
                  {`$${item.item.price}`}
                </Grid>
              </Fragment>
            ))}
            <Grid item xs={8}>
              <Box my={2} className="fontFamilyBook">
                SUBTOTAL
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box my={2} className="fontFamilyBook">
                {`$${total}`}
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Typography>
  </Paper>
);

OrderInfo.defaultProps = {
  total: NaN,
  invoiceToItems: [],
};

OrderInfo.propTypes = {
  total: PropTypes.number,
  invoiceToItems: PropTypes.arrayOf(PropTypes.any),
};

export default OrderInfo;
