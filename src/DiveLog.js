import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DiveEntry from './DiveEntry';
import AddDiveDialog from './AddDiveDialog.js';
import DiveInfoDialog from './DiveInfoDialog.js';

const DiveLogBody = props => {
  let entries = []
  for (let index = props.diveData.length - 1; index >= 0; index--) {
    let entry = props.diveData[index];
    entry["dive_num"] = index;
    entries.push(<DiveEntry entryData={entry} key={index} curr_dive={index} handleEntryClick={props.handleEntryClick}/>)
  }

  return entries;
}

class DiveLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add_dialog_opened: false,
      dive_info_opened: false,
      current_dive: 0,
    };
  }

  handleClickAdd = () => {
    this.setState({add_dialog_opened: true})
  }

  handleClickAddDiveClose = () => {
    this.setState({add_dialog_opened: false})
  }

  handleEntryClick = curr_dive => {
    this.setState({dive_info_opened: true, current_dive: curr_dive})
  }

  handleDiveInfoClose = () => {
    this.setState({dive_info_opened: false})
  }

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
          <DiveLogBody diveData={diveData} handleEntryClick={this.handleEntryClick}/>
          <Fab style={add_dive_style}
               color="primary"
               aria-label="add"
               onClick={this.handleClickAdd}>
            <AddIcon />
          </Fab>
        </div>
        <AddDiveDialog opened={this.state.add_dialog_opened}
                       handleClickClose={this.handleClickAddDiveClose}
                       handleSaveClick={this.props.handleSaveClick}/>
        <DiveInfoDialog diveData={diveData[this.state.current_dive]}
                        opened={this.state.dive_info_opened}
                        handleClickClose={this.handleDiveInfoClose}/>
      </div>
    )
  }
}

export default DiveLog;