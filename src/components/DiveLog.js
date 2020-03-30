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
      add_dialog_opened: false,
      dive_info_opened: false,
      dialog_view_state: "add",
    };
  }

  handleClickAddDive = () => {
    this.setState({add_dialog_opened: true, dialog_view_state: "add"})
  }

  handleClickAddDiveClose = () => {
    this.setState({add_dialog_opened: false})
  }

  handleEntryClick = () => {
    this.setState({dive_info_opened: true})
  }

  handleDiveInfoClose = () => {
    this.setState({dive_info_opened: false})
  }

  toggleDialogView = (new_val) => {
    this.setState({dialog_view_state: new_val});
  }

  render() {
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
          <DiveList handleEntryClick={this.handleEntryClick}/>
          <Fab style={add_dive_style}
               color="primary"
               aria-label="add"
               onClick={this.handleClickAddDive}>
            <AddIcon />
          </Fab>
        </div>
        <AddDiveDialog opened={this.state.add_dialog_opened}
                       dialog_view_state={this.state.dialog_view_state}
                       handleClickClose={this.handleClickAddDiveClose}/>
        <DiveInfoDialog opened={this.state.dive_info_opened}
                        handleClickClose={this.handleDiveInfoClose}
                        toggleDialogView={this.toggleDialogView}/>
      </div>
    )
  }
}

export default DiveLog;