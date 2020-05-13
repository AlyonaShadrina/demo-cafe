import { Box, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';

const CategoryLayout = ({ title, children }) => (
  <Paper component={Box} p={3}>
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={4}>
        <Typography variant="h1" component="h2">
          <Box textAlign="right" maxWidth={170}>
            Select a
            <br />
            <Box
              fontSize={60}
              textAlign="center"
              lineHeight={1}
              className="accentFont"
              component="span"
              fontWeight="400"
            >
              {title}
            </Box>
          </Box>
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        {children}
      </Grid>
    </Grid>
  </Paper>
);

export default CategoryLayout;
