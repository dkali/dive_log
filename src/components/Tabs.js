import React, { Fragment, useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import DiveLog from './DiveLog.js';
import MapContainer from './MapContainer.js';
import Media from 'react-media';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div p={3}>{children}</div>}
    </Typography>
  );
}


function SimpleTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const add_dive_style = {
    position: "absolute",
    bottom: "2em",
    right: "2em",
    zIndex: "10000"
  }

  const add_dive_style_calc = {
    position: "absolute",
    bottom: "2em",
    right: "calc(66% + 2em)",
    zIndex: "10000"
  }

  return (
    <Fragment>
      <Media queries={{
        small: "(max-width: 799px)",
        medium: "(min-width: 800px)",
      }}>
        {matches => (
          <Fragment>
            {matches.small &&
              <Fragment>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                  <Tab data-testid={"dive_log_tab"} label="Dive Log" />
                  <Tab data-testid={"map_tab"} label="Map" />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <div style={{overflow: "auto", height: 'calc(100vh - 107px)'}} >
                    <DiveLog handleTabChange={handleChange} />
                      <Fab style={add_dive_style}
                        component={Link} to={"/add_dive"}
                        color="secondary"
                        data-testid={'add_new_dive_btn'}>
                        <AddIcon />
                      </Fab>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <MapContainer map_style={{
                    height: 'calc(100vh - 107px)',
                  }} />
                </TabPanel>
              </Fragment>
            }
            {matches.medium && 
              <Fragment>
                <Grid container>
                  <Grid item xs={4}>
                    <div style={{overflow: "auto", height: 'calc(100vh - 59px)'}} >
                      <DiveLog />
                      <NavLink to="/add_dive">
                        <Fab style={add_dive_style_calc}
                          component={Link} to={"/add_dive"}
                          color="secondary"
                          data-testid={'add_new_dive_btn'}>
                          <AddIcon />
                        </Fab>
                      </NavLink>
                    </div>
                  </Grid>
                  <Grid item xs={8}>
                    <MapContainer map_style={{
                      height: 'calc(100vh - 59px)',
                    }
                    } />
                  </Grid>
                </Grid>
              </Fragment>}
          </Fragment>
        )}
      </Media>


    </Fragment>
  );
}

export default SimpleTabs;