import React from 'react';
import { connect } from "react-redux";
import { selectDive } from "../redux/actions";
import 'date-fns';
import format from "date-fns/format";
import fromUnixTime from 'date-fns/fromUnixTime'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import { Check, Height, Timelapse, Edit } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { NavLink } from 'react-router-dom';


const styles = theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
  }
});

function DiveEntry(props) {
  const handleClick = () => {
    props.selectDive(props.firestore_id);
    if (props.handleTabChange !== undefined) {
      props.handleTabChange(null, 1);
    }
  }

  const { entryData, dive_num, classes } = props;

  return (
    <ListItem className={classes.root} onClick={handleClick}>
      <Paper className={classes.paper}>
        <Box bgcolor="primary.main" color="primary.contrastText" p={2}>
          <Grid container>
            <Grid item xs container direction="column" spacing={2}>
              <Typography variant="subtitle1" gutterBottom>
                {entryData.location.name}
              </Typography>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={2} container direction="row" alignItems="center">
                  <Box p={1}>
                    <Check fontSize="small" />
                  </Box>
                  <Typography variant="body2" gutterBottom>
                    {dive_num}
                  </Typography>
                </Grid>

                <Grid item xs={2} container direction="row" alignItems="center">
                  <Box p={1}>
                    <Height fontSize="small" />
                  </Box>
                  <Typography variant="body2" gutterBottom>
                    {entryData.depth}
                  </Typography>
                </Grid>

                <Grid item xs={2} container direction="row" alignItems="center">
                  <Box p={1}>
                    <Timelapse fontSize="small" />
                  </Box>
                  <Typography variant="body2" gutterBottom>
                    {entryData.duration}
                  </Typography>
                </Grid>

              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{format(fromUnixTime(entryData.date.seconds), "MMM dd, yyyy")}</Typography>
              <IconButton>
                <NavLink to={`/dive/${props.firestore_id}`}>
                  <Edit />
                </NavLink >
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </ListItem>
  )
}

export default connect(
  null,
  { selectDive }
)(withStyles(styles)(DiveEntry));