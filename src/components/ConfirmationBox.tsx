import {
  Button,
  createStyles,
  Dialog,
  Grid,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import { ConfirmationContext } from "context/ConfirmationContext";
import React, { useContext } from "react";
import ColorsEnum from "types/ColorsEnum";

const styles = () =>
  createStyles({
    root: {},
    paper: {
      backgroundColor: ColorsEnum.BGLIGHT,
      borderRadius: "0px",
      padding: "20px",
    },
  });

const ConfirmationBox: React.FunctionComponent<WithStyles<typeof styles>> = (
  props
) => {
  const { classes } = props;

  const [confirmationContext, dispatchConfirmationContext] = useContext(
    ConfirmationContext
  );

  return (
    <Dialog
      onClose={() =>
        confirmationContext.close(
          dispatchConfirmationContext,
          confirmationContext
        )
      }
      open={confirmationContext.open}
      className={classes.root}
      classes={{
        paper: classes.paper,
      }}
    >
      <Typography variant="h6" style={{ marginBottom: "25px" }}>
        Confirmation needed
      </Typography>
      <Typography variant="body2" style={{ marginBottom: "30px" }}>
        {confirmationContext.content}
      </Typography>
      <Grid container justify="center" spacing={10}>
        <Grid item>
          <Button
            onClick={() =>
              confirmationContext.close(
                dispatchConfirmationContext,
                confirmationContext
              )
            }
            fullWidth
            variant="outlined"
            color="secondary"
          >
            NO
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() =>
              confirmationContext.confirm(
                dispatchConfirmationContext,
                confirmationContext
              )
            }
            fullWidth
            color="primary"
          >
            YES
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default withStyles(styles)(ConfirmationBox);
