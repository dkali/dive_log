import React from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DiveEntry from './DiveEntry'
import AddDiveDialog from './AddDiveDialog.js'

const DiveLogBody = props => {
  let entries = []
  for (let index = props.diveData.length - 1; index >= 0; index--) {
    let entry = props.diveData[index];
    entry["dive_num"] = index;
    entries.push(<DiveEntry entryData={entry} key={index}/>)
  }

  return entries;
}

class DiveLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };
  }

  handleClickAdd = () => {
    this.setState({opened: true})
  }

  handleClickClose = () => {
    this.setState({opened: false})
  }

  onEntryClick = index => {

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
          <DiveLogBody diveData={diveData} onClick={this.onEntryClick}/>
          <Fab style={add_dive_style}
               color="primary"
               aria-label="add"
               onClick={this.handleClickAdd}>
            <AddIcon />
          </Fab>
        </div>
        <AddDiveDialog diveData={diveData}
                       opened={this.state.opened}
                       handleClickClose={this.handleClickClose}
                       handleSaveClick={this.props.handleSaveClick}/>
      </div>
    )
  }
}

export default DiveLog;