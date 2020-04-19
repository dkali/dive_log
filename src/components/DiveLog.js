import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddDiveDialog from './AddDiveDialog.js';
import EditDiveDialog from './EditDiveDialog.js';
import DiveInfoDialog from './DiveInfoDialog.js';
import DiveList from './DiveList.js'

class DiveLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add_dialog_opened: false,
      edit_dialog_opened: false,
      dive_info_opened: false,
    };
  }

  handleClickAddDive = () => {
    this.setState({add_dialog_opened: true})
  }

  handleClickEditDive = () => {
    this.setState({edit_dialog_opened: true})
  }
  
  handleEntryClick = () => {
    this.setState({dive_info_opened: true})
  }

  handleClickCloseDialog = () => {
    this.setState({add_dialog_opened: false,
                   edit_dialog_opened: false,
                   dive_info_opened: false})
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
      <div data-testid={'dive_log'}>
        <div style={dive_log_style}>
          <DiveList handleEntryClick={this.handleEntryClick}/>
          <Fab style={add_dive_style}
               color="primary"
               data-testid={'add_new_dive_btn'}
               onClick={this.handleClickAddDive}>
            <AddIcon />
          </Fab>
        </div>
        <AddDiveDialog data-testid={'add_dive_dialog'}
                       opened={this.state.add_dialog_opened}
                       handleClickClose={this.handleClickCloseDialog}/>
        <EditDiveDialog data-testid={'add_dive_dialog'}
                        opened={this.state.edit_dialog_opened}
                        handleClickClose={this.handleClickCloseDialog}/>
        <DiveInfoDialog data-testid={'dive_info_dialog'}
                        opened={this.state.dive_info_opened}
                        handleClickClose={this.handleClickCloseDialog}
                        handleClickEditDive={this.handleClickEditDive}/>
      </div>
    )
  }
}

export default DiveLog;