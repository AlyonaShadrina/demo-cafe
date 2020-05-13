import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import successIcon from '../../../../assets/images/success.svg';
import { TypeCard } from '../../../../types';
import CheckboxRounded from '../../../_common/CheckboxRounded';
import { editCardError } from '../../state/selectors';
import { cardCreate, cardEdit } from '../../../../validation/card';
import AddCardButton from './AddCardButton';
import cardFields from './cardFields';
import InputField from './InputField';

const useStyles = makeStyles(theme => ({
  dialog: {
    border: `2px solid ${theme.palette.secondary.main}`,
    maxWidth: 420,
  },
  title: {
    textAlign: 'center',
    padding: theme.spacing(1),
    '& h2': {
      fontWeight: 'bold',
      fontSize: 16,
      color: theme.palette.secondary.main,
      textTransform: 'uppercase',
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px ${theme.spacing(2)}px`,
  },
  success: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    maxWidth: 110,
    margin: 'auto',
  },
}));

/**
 * Component shows button. When clicked, modal with card form opens.
 * It handles editing and creating cards.
 *
 * If @param edit === true, modal will have two fields and checkbox, else - four fields and checkbox.
 */

const EditCardModal = ({ submit, CustomButton, initialValues, edit }) => {
  const classes = useStyles();

  const error = useSelector(editCardError);

  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = e => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (values, { setSubmitting, resetForm }) => {
    // we can't just set input type="number" because of react-text-mask
    const valuesToSend = { ...values };
    valuesToSend.expMonth = parseInt(valuesToSend.expMonth, 10);
    valuesToSend.expYear = parseInt(`20${valuesToSend.expYear}`, 10);

    const afterSuccess = () => {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        handleClose();
        resetForm();
      }, 2500);
    };

    submit({ values: valuesToSend, callback: afterSuccess });
    setSubmitting(false);
  };

  const fields = cardFields(edit);

  const formik = useFormik({
    initialValues,
    isInitialValid: false,
    validationSchema: edit ? cardEdit : cardCreate,
    onSubmit: handleSave,
    enableReinitialize: true,
  });

  const { errors, touched, dirty, values, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <>
      <CustomButton onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
        classes={{
          paper: classes.dialog,
        }}
      >
        <DialogTitle
          id="form-dialog-title"
          classes={{
            root: classes.title,
          }}
        >
          {`${edit ? 'Edit' : 'Add new'} card`}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent style={{ paddingTop: 0 }}>
            <Grid container spacing={2}>
              {fields.map(field => {
                if (field.show) {
                  return (
                    <Grid item xs={field.gridSize} key={field.name}>
                      <InputField
                        field={field}
                        touched={touched}
                        errors={errors}
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                      />
                    </Grid>
                  );
                }
                return null;
              })}
              <Grid item xs={12} component={Box} mt={2}>
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
              </Grid>
            </Grid>
            {success && <img src={successIcon} alt="" className={classes.success} />}
          </DialogContent>
          <DialogActions
            classes={{
              root: classes.actions,
            }}
          >
            <Button
              onClick={handleClose}
              color="primary"
              variant="outlined"
              className="minWidth130"
              size="small"
            >
              Cancel
            </Button>
            <Typography color="error">{error}</Typography>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="small"
              className="minWidth130"
              disabled={!dirty || !!Object.keys(errors).length}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

EditCardModal.defaultProps = {
  CustomButton: AddCardButton,
  initialValues: {
    setDefault: false,
  },
  edit: false,
};

EditCardModal.propTypes = {
  CustomButton: PropTypes.func,
  initialValues: TypeCard,
  submit: PropTypes.func.isRequired,
  edit: PropTypes.bool,
};

export default EditCardModal;
