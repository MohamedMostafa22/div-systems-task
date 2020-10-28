import React from "react";
import {
  makeStyles,
  Card as MuiCard,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Box,
} from "@material-ui/core";

import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  AddCircle as AddCircleIcon,
} from "@material-ui/icons";

import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 275,
    margin: 16,
    borderRadius: 15,
    minHeight: 236,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    background: theme.palette.primary.light,
    padding: 2,
    paddingLeft: 16,
    paddingRight: 8
  },
  cardHeaderIcon: {
    display: "flex",
    color: theme.palette.primary.dark,
    fontWeight: "bold",
  },
  cardHeaderName: {
    fontWeight: "bold",
  },
  checks: {
    display: "flex",
  },
  selectContainer: {
    width: "60%",
  },
  form: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "10%",
  },
  iconsContainer: {
    display: "flex",
    marginTop: 8,
  },
  iconContainer: {
    marginLeft: 8,
    color: '#717981'
  },
  cardFooter: {
    display: "flex",
    marginTop: 16,
  },
  buttonContainer: {
    marginLeft: 46,
    marginTop: 4
  },
  noMargin: {
    margin: 0,
  },
  formControl: {
    marginTop: 0,
  },
}));

const Card = React.forwardRef(({ name, status, ...props }, ref) => {
  const classes = useStyles();

  return (
    <MuiCard className={classes.root} variant="elevation" {...props} ref={ref}>
      <div className={classes.cardHeader}>
        <Typography className={classes.cardHeaderName}>{name}</Typography>
        <div className={classes.cardHeaderIcon}>
          <span>{status}</span>
          <DeleteIcon color="secondary" />
        </div>
      </div>
      <div className={classes.checks}>
        <FormGroup aria-label="position" row>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Company"
            labelPlacement="start"
            style={{
              color: '#a19f9f'
            }}
          />
        </FormGroup>
        <FormGroup
          aria-label="position"
          row
          style={{
            marginLeft: 24,
          }}
        >
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Individual"
            labelPlacement="start"
            style={{
              color: '#a19f9f'
            }}
          />
        </FormGroup>
      </div>
      <div className={classes.form}>
        <div className={classes.selectContainer}>
          <FormControl fullWidth margin="none">
            <InputLabel
              style={{
                fontSize: 12,
                top: -10
              }}
              id="name"
            >
              Name
            </InputLabel>
            <Select labelId="name" id="name-select" fullWidth />
          </FormControl>
        </div>
        <div className={classes.iconsContainer}>
          <div className={classes.iconContainer}>
            <VisibilityIcon fontSize="small" color="inherit" />
          </div>
          <div className={classes.iconContainer}>
            <AddCircleIcon fontSize="small" color="inherit" />
          </div>
        </div>
      </div>
      <div className={classes.form}>
        <div className={classes.selectContainer}>
          <FormControl margin="none" fullWidth>
            <InputLabel
              id="product"
              style={{
                fontSize: 12,
                top: -10
              }}
            >
              Product
            </InputLabel>
            <Select labelId="product" id="product-select" fullWidth />
          </FormControl>
        </div>
        <div className={classes.iconsContainer}>
          <div className={classes.iconContainer}>
            <VisibilityIcon fontSize="small" color="inherit" />
          </div>
          <div className={classes.iconContainer}>
            <AddCircleIcon fontSize="small" color="inherit" />
          </div>
        </div>
      </div>
      <div className={classes.form}>
        <TextField
          InputLabelProps={{
            style: {
              fontSize: 12,
              top: -10
            },
          }}
          id="standard-required"
          label="Expected Revenue"
          margin="none"
          size="small"
        />
      </div>
      <div className={classes.cardFooter}>
        <Box component="fieldset" borderColor="transparent">
          <Typography component="legend" style={{
            fontSize: 12,
            color: '#c1b7b9'
          }}>Priority</Typography>
          <Rating size="small" name="simple-controlled" defaultValue={3} />
        </Box>
        <div className={classes.buttonContainer}>
          <Button variant="contained" color="primary">
            Create
          </Button>
        </div>
      </div>
    </MuiCard>
  );
});

export default Card;
