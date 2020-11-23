import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DiveLog from './DiveLog.js';
import MapContainer from './MapContainer.js';

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
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class SimpleTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }
  
  handleChange = (event, newValue) => {
    this.setState({value: newValue})
  };

  render() {
    const tabs_style = {
      flexGrow: "initial",
    }

    return (
      <div style={tabs_style}>
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example" centered>
            <Tab data-testid={"dive_log_tab"} label="Dive Log" {...a11yProps(0)} />
            <Tab data-testid={"map_tab"} label="Map" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <DiveLog handleTabChange={this.handleChange}/>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <MapContainer />
        </TabPanel>
      </div>
    );
  }
}

export default SimpleTabs;