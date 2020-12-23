import React, { Fragment } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import DiveLog from './DiveLog.js';
import MapContainer from './MapContainer.js';
import Media from 'react-media';
import Grid from '@material-ui/core/Grid';


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


class SimpleTabs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue })
  };

  render() {
    return (
      <Fragment>
        <Media queries={{
          small: "(max-width: 799px)",
          medium: "(min-width: 800px)",
        }}>
          {matches => (
            <Fragment>
              {matches.small &&
                <div><Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example" centered>
                  <Tab data-testid={"dive_log_tab"} label="Dive Log" />
                  <Tab data-testid={"map_tab"} label="Map" />
                </Tabs>
                  <TabPanel value={this.state.value} index={0}>
                    <DiveLog handleTabChange={this.handleChange} />
                  </TabPanel>
                  <TabPanel value={this.state.value} index={1}>
                  <MapContainer map_style={{
                      height: 'calc(100vh - 98px)',
                      width: "auto"
                    }
                    } />
                  </TabPanel></div>
              }
              {matches.medium && <div>
                <Grid container spacing={1}>
                  <Grid item xs>
                    <DiveLog handleTabChange={this.handleChange} />
                  </Grid>
                  <Grid item xs>
                    <MapContainer map_style={{
                      height: 'calc(100vh - 50px)',
                      width: '50vw'
                    }
                    } />
                  </Grid>
                </Grid>
              </div>}
            </Fragment>
          )}
        </Media>


      </Fragment>
    );
  }
}

export default SimpleTabs;