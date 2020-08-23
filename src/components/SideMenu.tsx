import {
  Collapse,
  createStyles,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import PlusIcon from "@material-ui/icons/Add";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { withStyles, WithStyles } from "@material-ui/styles";
import Logo from "assets/transistor.svg"; // with import
import Link from "components/Link";
import { AccountContext } from "context/AccountContext";
import { SensorContext } from "context/SensorContext";
import React, { Fragment, useContext } from "react";
import ColorsEnum from "types/ColorsEnum";
import Sensor from "types/Sensor";

const styles = () =>
  createStyles({
    root: {
      backgroundColor: ColorsEnum.BGLIGHT,
      width: "270px",
      height: "100%",
    },
    sensorInputForm: {
      margin: "30px 10px",
      display: "flex",
      flexDirection: "column",
      "& >div": {
        marginBottom: "10px",
      },
      "& .MuiFormHelperText-contained": {
        marginLeft: "0px",
        marginRight: "0px",
      },
    },
    inputFabLower: {
      display: "flex",
      flexDirection: "row",
    },
    fab: {
      marginLeft: "20px",
    },
    logoContainer: {
      //height: "80px",
      //width: "80px",
      display: "flex",
      justifyContent: "center",
      width: "40px",
      height: "70px",
      "& img": {
        width: "70px",
      },
    },
    sensorFab: {
      width: "35px",
      height: "35px",
      color: "white",
      marginLeft: "10px",
    },
    userContainer: {
      padding: "15px",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
    },
  });

interface SideMenuProps {}

const SideMenu: React.FunctionComponent<
  SideMenuProps & WithStyles<typeof styles>
> = (props) => {
  const [{ sensors }, dispatch] = useContext(SensorContext);
  const [{ loginState, user, logout }, dispatchAccount] = useContext(
    AccountContext
  );

  // let [validationErrors, setValidationErrors] = useState({});

  // let [sensorToAdd, setSensorToAdd] = useState(new Sensor());

  // const addSensor = async (e) => {
  //   e.preventDefault();

  //   setValidationErrors(await validateAndTransform(sensorToAdd));
  //   if (Object.keys(validationErrors).length > 0) {
  //     return;
  //   }

  //   const { sensorStore } = props;
  //   sensorStore.addSensor(sensorToAdd);
  //   setSensorToAdd(new Sensor());
  // };

  // const removeSensor = async (sensor: Sensor) => {
  //   const { sensorStore } = props;
  //   sensorStore.removeSensor(sensor);
  // };

  const toggleVisibility = async (e: any, sensor: Sensor) => {
    e.stopPropagation();
    sensor.visible = !sensor.visible;
    dispatch({
      type: "updateSensor",
      payload: sensor,
    });
  };

  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.userContainer}>
        <div className={classes.logoContainer}>
          <Link to="/">
            <img alt="logo" src={Logo} />
          </Link>
        </div>
        {(loginState === "LOGGED_OUT" || loginState === "LOGIN_ERROR") && (
          <div>
            <Link to="/login">Login</Link> &nbsp; | &nbsp;
            <Link to="/register">Register</Link>
          </div>
        )}
        {loginState === "LOGGED_IN" && (
          <div>
            Welcome, {user.username}.{" "}
            <Link onClick={() => logout(dispatchAccount)}>Logout</Link>
          </div>
        )}
      </div>
      {/* <div className={classes.logoContainer}>
        <img alt="logo" src="/logo.svg" />
      </div>
      <form className={classes.sensorInputForm} onSubmit={addSensor}>
        <TextField
          id="outlined-basic"
          label="Sensor address"
          variant="outlined"
          value={sensorToAdd.address}
          onChange={(e) => (sensorToAdd.address = e.target.value)}
          error={!!validationErrors.address}
          helperText={validationErrors.address?.message}
        />
        <FormControl variant="outlined" error={!!validationErrors.type}>
          <InputLabel>Type</InputLabel>
          <Select
            value={sensorToAdd.type || ""}
            onChange={(e) =>
              (sensorToAdd.type = e.target.value as SensorTypesEnum)
            }
          >
            {Object.values(SensorTypesEnum).map((st, index) => (
              <MenuItem value={st} key={index}>
                {st}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {validationErrors.type?.message}
          </FormHelperText>
        </FormControl>
        <div className={classes.inputFabLower}>
          <TextField
            style={{ width: "calc(100% - 75px)" }}
            id="outlined-basic"
            label="Sensor name"
            variant="outlined"
            value={sensorToAdd.name}
            onChange={(e) => (sensorToAdd.name = e.target.value)}
            error={!!validationErrors.name}
            helperText={validationErrors.name?.message}
          />
          <Fab type="submit" color="primary" className={classes.fab}>
            <AddIcon />
          </Fab>
        </div>
      </form> */}

      <ListSubheader>
        <Grid container>
          <Grid item xs>
            Added sensors
          </Grid>
          {loginState === "LOGGED_IN" && (
            <Grid item>
              <Link to="/add-sensor">
                <Fab
                  color="primary"
                  size="small"
                  className={classes.sensorFab}
                  onClick={(e) => {}}
                >
                  <PlusIcon />
                </Fab>
              </Link>
            </Grid>
          )}
        </Grid>
      </ListSubheader>
      <Divider />
      <List disablePadding>
        {sensors.map((sensor: Sensor & { expanded: boolean }, index) => (
          <Fragment key={index}>
            <ListItem
              divider
              button
              onClick={() => (sensor.expanded = !sensor.expanded)}
            >
              <ListItemIcon>
                {sensor.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemIcon>
              <ListItemText primary={sensor.name} />
              <Fab
                color="secondary"
                size="small"
                className={classes.sensorFab}
                onClick={(e) => {
                  toggleVisibility(e, sensor);
                }}
              >
                {sensor.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </Fab>
              {/* <Fab
                color="secondary"
                size="small"
                className={classes.sensorFab}
                onClick={() => removeSensor(sensor)}
              >
                <RemoveIcon />
              </Fab> */}
            </ListItem>
            <Collapse in={sensor.expanded} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {sensor.measurementTypes.map((m, index) => (
                  <ListItem button key={index}>
                    <ListItemText primary={`${m}`} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Fragment>
        ))}
      </List>
    </div>
  );
};

export default withStyles(styles)(SideMenu);
