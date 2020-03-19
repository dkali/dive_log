import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddDiveDialog from './AddDiveDialog.js';
import DiveInfoDialog from './DiveInfoDialog.js';
import DiveList from './DiveList.js'

class DiveLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog_title: "",
      add_dialog_opened: false,
      dive_info_opened: false,
      // current_dive: 0,
    };
  }

  handleClickAddDive = () => {
    this.setState({add_dialog_opened: true, dialog_title: "Add Dive location"})
  }

  handleClickAddDiveClose = () => {
    this.setState({add_dialog_opened: false})
  }

  // handleEntryClick = curr_dive => {
  //   this.setState({dive_info_opened: true, current_dive: curr_dive})
  // }

  // handleDiveInfoClose = () => {
  //   this.setState({dive_info_opened: false})
  // }

  render() {
    const { diveData } = this.props;

    const add_dive_style = {
      position: "fixed",
      bottom: "2em",
      right: "2em",
    }

    const dive_log_style = {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "space-around",
    }

    return (
      <div>
        <div style={dive_log_style}>
          <DiveList/>
          <Fab style={add_dive_style}
               color="primary"
               aria-label="add"
               onClick={this.handleClickAddDive}>
            <AddIcon />
          </Fab>
        </div>
        <AddDiveDialog opened={this.state.add_dialog_opened}
                       title={this.state.dialog_title}
                       handleClickClose={this.handleClickAddDiveClose}/>
        {/* <DiveInfoDialog diveData={diveData[this.state.current_dive]}
                        opened={this.state.dive_info_opened}
                        handleClickClose={this.handleDiveInfoClose}/> */}
      </div>
    )
  }
}

export default DiveLog;