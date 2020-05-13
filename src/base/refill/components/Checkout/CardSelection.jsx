import { Avatar, Box, Grid, InputLabel, Paper, Radio, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TypeCard } from '../../../../types';

import palette from '../../../../styles/palette';
import Loading from '../../../_common/Loading';
import Card from '../../../_common/Card';
import CheckboxRounded from '../../../_common/CheckboxRounded';
import InputField from '../../../profile/components/CardsList/InputField';

const CardSelection = ({
  cards,
  values,
  setFieldValue,
  newCardFields,
  touched,
  errors,
  handleChange,
}) => {
  const [disabledForm, setDisabledForm] = useState(false);

  const handleCardInputChange = e => {
    setFieldValue('cardId', null);
    handleChange(e);
  };

  const handleCardInputClick = () => {
    setDisabledForm(false);
    setFieldValue('cardId', null);
  };

  return (
    <Paper component={Box} px={5} pt={4} pb={6}>
      <Box mb={5}>
        <Typography variant="h1">Payment Method</Typography>
      </Box>
      {!values.amount ? (
        <Loading />
      ) : (
        <Typography component="div" color="primary">
          <Box mb={2}>
            <div className="fontFamilyBook">PAY WITH SAVED CARD ON FILE</div>
            {cards.map(card => (
              <Grid
                key={card.id}
                container
                justify="flex-start"
                alignItems="center"
                component="label"
              >
                <Radio
                  checked={values.cardId === card.id}
                  onChange={() => {
                    setFieldValue('cardId', card.id);
                    setDisabledForm(true);
                  }}
                  value={card.id}
                  name="cardId"
                  inputProps={{ 'aria-label': 'A' }}
                  size="small"
                  style={{ marginLeft: -12 }}
                />
                <Grid item>
                  <Card key={card.id} card={card} />
                </Grid>
              </Grid>
            ))}
          </Box>
          <Avatar
            style={{
              width: 60,
              height: 60,
              backgroundColor: palette.secondary.main,
              marginBottom: 24,
            }}
          >
            OR
          </Avatar>
          <div className="fontFamilyBook">ENTER NEW CARD NUMBER</div>
          <Grid container spacing={2}>
            {newCardFields.map(field => (
              <Grid item xs={field.gridSize} key={field.name}>
                <InputField
                  field={field}
                  touched={touched}
                  errors={errors}
                  values={values}
                  handleChange={handleCardInputChange}
                  disabled={disabledForm}
                  onClick={handleCardInputClick}
                />
              </Grid>
            ))}
          </Grid>
          <CheckboxRounded
            id="setDefault"
            name="setDefault"
            style={{ marginLeft: -12 }}
            onChange={handleChange}
            value={values.setDefault}
            checked={values.setDefault}
          />
          <InputLabel htmlFor="setDefault" style={{ display: 'inline-block', fontSize: 12 }}>
            Set as default
          </InputLabel>
        </Typography>
      )}
    </Paper>
  );
};

CardSelection.defaultProps = {
  values: {},
  touched: {},
  errors: {},
};

CardSelection.propTypes = {
  cards: PropTypes.arrayOf(TypeCard).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  newCardFields: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleChange: PropTypes.func.isRequired,
  touched: PropTypes.shape(PropTypes.any),
  errors: PropTypes.shape(PropTypes.any),
  values: PropTypes.shape(PropTypes.any),
};

export default CardSelection;
