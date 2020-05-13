import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../../_common/Card';
import EditCardModal from '../components/CardsList/EditCardModal';
import * as selectors from '../state/selectors';
import * as actions from '../state/actions';

const CardsListContainer = () => {
  const { id, cards } = useSelector(selectors.profile);

  const dispatch = useDispatch();

  const addNewCard = ({ values, callback }) => {
    dispatch(actions.addCardRequest({ userId: id, data: values, callback }));
  };

  return (
    <Grid container justify="space-between">
      <Grid item xs={12}>
        <Typography color="primary" variant="body2">
          Saved cards
        </Typography>
      </Grid>
      <Grid item>{cards && cards.map(card => <Card key={card.id} card={card} editable />)}</Grid>
      <Grid item>
        <EditCardModal submit={addNewCard} />
      </Grid>
    </Grid>
  );
};

export default CardsListContainer;
