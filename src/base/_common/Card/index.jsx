import { Box, Button, Grid } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Sprite from '../../../assets/images/sprite.svg';
import SvgSymbol from '../InlineSvg';
import * as actions from '../../profile/state/actions';
import * as selectors from '../../profile/state/selectors';
import EditCardModal from '../../profile/components/CardsList/EditCardModal';
import { TypeCard } from '../../../types';
import ButtonWithModal from '../ButtonWithModal';

const Card = ({ card, editable }) => {
  const { id } = useSelector(selectors.profile);
  const dispatch = useDispatch();

  const cardText = `ending in: ${card.cardNumber.substr(-4)}`;

  const handleDelete = ({ callback }) => {
    dispatch(actions.deleteCardRequest({ cardId: card.id, userId: id, callback }));
  };

  if (!editable) {
    return (
      <Grid container justify="flex-start" alignItems="center">
        <Box mr={0.5}>{cardText}</Box>
        <ButtonWithModal
          title={`Delete ${card.cardNumber} card?`}
          onHandleSubmit={handleDelete}
          buttonProps={{
            size: 'small',
            className: 'noTextTransform fontFamilyLight',
          }}
          buttonIcon
        >
          <SvgSymbol path={Sprite} iconName="trash" fill="secondary" width="15" height="15" />
        </ButtonWithModal>
      </Grid>
    );
  }

  const handleEdit = ({ values, callback }) => {
    dispatch(
      actions.editCardRequest({
        cardId: card.id,
        userId: id,
        data: values,
        callback,
        successMessage: `${card.cardNumber} card updated.`,
      }),
    );
  };

  const EditButton = props => (
    <Button
      size="small"
      color="secondary"
      className="noTextTransform"
      startIcon={<SvgSymbol path={Sprite} iconName="card" fill="primary" width="15" height="15" />}
      {...props}
    >
      {cardText}
    </Button>
  );

  return (
    <Box pr={2} mb={0.5}>
      <Grid container justify="space-between" alignItems="center">
        <EditCardModal
          submit={handleEdit}
          CustomButton={EditButton}
          edit
          initialValues={{ setDefault: card.isDefault }}
        />
        <ButtonWithModal
          title={`Delete ${card.cardNumber} card?`}
          onHandleSubmit={handleDelete}
          buttonProps={{
            size: 'small',
            className: 'noTextTransform',
          }}
          buttonIcon
        >
          <SvgSymbol path={Sprite} iconName="trash" fill="primary" width="15" height="15" />
        </ButtonWithModal>
      </Grid>
    </Box>
  );
};

Card.defaultProps = {
  editable: false,
};

Card.propTypes = {
  card: TypeCard.isRequired,
  editable: PropTypes.bool,
};

export default Card;
