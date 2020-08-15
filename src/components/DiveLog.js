import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DiveInfoDialog from './DiveInfoDialog.js';
import DeleteConfirmationDialog from './DeleteConfirmationDialog.js'
import DiveList from './DiveList.js';
import { NavLink } from 'react-router-dom';

class DiveLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dive_info_opened: false,
      del_confirmation_opened: false,
    };
  }
  
  handleEntryClick = () => {
    this.setState({dive_info_opened: true})
  }

  handleDeleteClick = () => {
    this.setState({del_confirmation_opened: true})
  }

  handleClickCloseDialog = () => {
    this.setState({dive_info_opened: false,
                   del_confirmation_opened: false})
  }

  handleClickCloseDelConfirmationDialog = () => {
    this.setState({del_confirmation_opened: false})
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
          <NavLink to="/add_dive">
            <Fab style={add_dive_style}
                color="primary"
                data-testid={'add_new_dive_btn'}>
              <AddIcon />
            </Fab>
          </NavLink>
        </div>
        <DiveInfoDialog data-testid={'dive_info_dialog'}
                        opened={this.state.dive_info_opened}
                        handleClickClose={this.handleClickCloseDialog}
                        handleTabChange={this.props.handleTabChange}
                        handleDeleteClick={this.handleDeleteClick} />
        <DeleteConfirmationDialog data-testid={'delete_confirmation'}
                        opened={this.state.del_confirmation_opened}
                        handleClickCloseDelConfirmationDialog={this.handleClickCloseDelConfirmationDialog}
                        handleClickCloseDialog={this.handleClickCloseDialog} />
      </div>
    )
  }
}

export default DiveLog;