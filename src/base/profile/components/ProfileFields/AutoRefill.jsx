import {
  Box,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
  InputBase,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import CheckboxRounded from '../../../_common/CheckboxRounded';
import SvgSymbol from '../../../_common/InlineSvg';
import Sprite from '../../../../assets/images/sprite.svg';
import * as actions from '../../state/actions';
import * as selectors from '../../state/selectors';

const useStyles = makeStyles(theme => ({
  checkbox: {
    marginLeft: -12,
  },
  label: {
    display: 'inline-block',
    verticalAlign: 'middle',
    color: theme.palette.primary.main,
  },
  selectContainer: {
    position: 'relative',
  },
  refillError: {
    whiteSpace: 'nowrap',
    top: '30px !important',
    right: 0,
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    boxShadow: theme.shadows[3],
    fontSize: 10,
    maxWidth: 250,
    borderRadius: 0,
  },
  infoIcon: {
    width: 10,
    height: 10,
    verticalAlign: 'top',
  },
  gridRow: {
    display: 'grid',
    gridTemplateColumns: '100px 60px 60px',
  },
  menuItem: {
    border: `1px solid ${theme.palette.grey['200']}`,
    padding: '2px 8px',
    color: theme.palette.secondary.main,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
  menuContainer: {
    padding: '0 !important',
  },
  selectInput: {
    maxWidth: 75,
    overflow: 'hidden',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 2,
    border: '2px solid #eee',
    borderRadius: 2,
  },
  menuHeader: {
    textTransform: 'uppercase',
    backgroundColor: `${theme.palette.grey['200']} !important`,
    color: theme.palette.primary.main,
    fontSize: 10,
    fontWeight: 400,
    opacity: '1 !important',
    '&:hover': {
      backgroundColor: `${theme.palette.grey['200']} !important`,
      color: theme.palette.primary.main,
    },
  },
  menuItemSelected: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: `${theme.palette.common.white} !important`,
  },
  menuPaper: {
    boxShadow: 'none !important',
  },
  input: {
    color: theme.palette.secondary.main,
    fontWeight: 600,
    fontSize: 16,
  },
  inputFocused: {
    backgroundColor: `${theme.palette.grey['200']} !important`,
  },
}));

const autoRefillTooltip = [
  "'Automatic Refill' refills your account automatically - as soon your account gets low - with the card saved on your account.",
  "By choosing 'Automatic Refill' you will browse with ease and comfort that you will never run out of usage time.",
  'In addition, you will also enjoy more "bonus minutes".',
];

const AutoRefill = ({ values, errors, handleChange }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const refill = useSelector(selectors.refill);

  useEffect(() => {
    dispatch(actions.getRefillRequest());
  }, []);

  return (
    <Grid container justify="space-between" alignItems="center" component={Box} mb={2}>
      <Grid item>
        <CheckboxRounded
          id="autoRefill"
          name="autoRefill"
          className={classes.checkbox}
          checked={values.autoRefill}
          onChange={handleChange}
        />
        <InputLabel className={classes.label} htmlFor="autoRefillCheck">
          <Tooltip
            title={(
              <div>
                {autoRefillTooltip.map((text, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Box key={i} mb={1}>
                    {text}
                  </Box>
                ))}
              </div>
            )}
            placement="right-start"
            classes={{
              tooltip: classes.tooltip,
            }}
          >
            <Box fontWeight={600} component="span">
              Automatic Refill
              <SvgSymbol path={Sprite} iconName="info" className={classes.infoIcon} />
            </Box>
          </Tooltip>
        </InputLabel>
      </Grid>
      <Grid item className={classes.selectContainer}>
        <Select
          disableUnderline
          displayEmpty
          name="refillId"
          inputProps={{
            id: 'refillId',
          }}
          input={<InputBase classes={{ focused: classes.inputFocused, root: classes.input }} />}
          value={values.refillId}
          onChange={handleChange}
          classes={{
            root: classes.selectInput,
          }}
          MenuProps={{
            classes: {
              list: classes.menuContainer,
              paper: classes.menuPaper,
            },
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
          }}
          renderValue={value =>
            values.autoRefill ? (
              refill?.find(ref => ref.id === value)?.plan || values.refillId
            ) : (
              <Typography component="span" color="primary" className="fontFamilyBook">
                <Box fontSize={16} lineHeight={1.2}>
                  Select
                </Box>
              </Typography>
            )}
        >
          <MenuItem
            disabled
            classes={{ root: `${classes.menuItem} ${classes.menuHeader} fontFamilyBook` }}
          >
            <div className={classes.gridRow}>
              <div>Plan</div>
              <div>Refill by</div>
              <div>Bonus time</div>
            </div>
          </MenuItem>
          {refill
            .sort((a, b) => a.plan.split(' ')[0] - b.plan.split(' ')[0])
            .map(item => (
              <MenuItem
                value={item.id}
                key={item.id}
                classes={{ root: classes.menuItem, selected: classes.menuItemSelected }}
              >
                <div className={classes.gridRow}>
                  <div>{item.plan}</div>
                  <div>{`${item.refillBy} Min.`}</div>
                  <div>{`${item.bonusTime} Min.`}</div>
                </div>
              </MenuItem>
            ))}
        </Select>
        <FormHelperText error className={`inputHelperTextAbsolute ${classes.refillError}`}>
          {errors.autoRefill}
        </FormHelperText>
      </Grid>
    </Grid>
  );
};

AutoRefill.propTypes = {
  errors: PropTypes.shape(PropTypes.any).isRequired,
  values: PropTypes.shape(PropTypes.any).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default AutoRefill;
