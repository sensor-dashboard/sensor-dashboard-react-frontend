import {
  createStyles,
  Grid,
  MuiThemeProvider,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import ConfirmationBox from "components/ConfirmationBox";
import SideMenuWrapper from "components/SideMenuWrapper";
import ToastBox from "components/ToastBox";
import { AccountContextProvider } from "context/AccountContext";
import { AppContextProvider } from "context/AppContext";
import { ConfirmationContextProvider } from "context/ConfirmationContext";
import { DisplayContextProvider } from "context/DisplayContext";
import { SensorContextProvider } from "context/SensorContext";
import { ToastContextProvider } from "context/ToastContext";
import theme from "layout/Theme";
import AddDisplayPage from "pages/AddDisplayPage";
import AddSensorPage from "pages/AddSensorPage";
import DisplayInfoPage from "pages/DisplayInfoPage";
import DisplayListPage from "pages/DisplayListPage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import SensorInfoPage from "pages/SensorInfoPage";
import SensorsPage from "pages/SensorsPage";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ColorsEnum from "types/ColorsEnum";

const styles = () =>
  createStyles({
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.4em",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": `inset 0 0 6px ${ColorsEnum.BGDARK}`,
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: ColorsEnum.BGLIGHTER,
        outline: "0px solid slategrey",
      },
    },
    app: {
      minHeight: "100vh",
      backgroundColor: ColorsEnum.BGDARK,
      width: "100%",
    },
    main: {
      flex: "1",
    },
  });

class App extends React.Component<WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props;
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <AccountContextProvider>
            <AppContextProvider>
              <SensorContextProvider>
                <ConfirmationContextProvider>
                  <DisplayContextProvider>
                    <ToastContextProvider>
                      <ToastBox />
                      <ConfirmationBox />

                      <Grid container className={classes.app}>
                        <Grid item>
                          <SideMenuWrapper />
                        </Grid>
                        <Grid item style={{ flex: "1" }}>
                          <Route exact path="/">
                            <SensorsPage />
                          </Route>
                          <Route exact path="/login">
                            <LoginPage />
                          </Route>
                          <Route exact path="/register">
                            <RegisterPage />
                          </Route>
                          <Route exact path="/add-sensor">
                            <AddSensorPage />
                          </Route>
                          <Route exact path="/add-display">
                            <AddDisplayPage />
                          </Route>
                          <Route exact path="/sensors/:id">
                            <SensorInfoPage />
                          </Route>
                          <Route exact path="/displays/:id">
                            <DisplayInfoPage />
                          </Route>
                          <Route exact path="/displays">
                            <DisplayListPage />
                          </Route>
                        </Grid>
                      </Grid>
                    </ToastContextProvider>
                  </DisplayContextProvider>
                </ConfirmationContextProvider>
              </SensorContextProvider>
            </AppContextProvider>
          </AccountContextProvider>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);
