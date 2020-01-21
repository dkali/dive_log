import React from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DiveEntry from './DiveEntry'

const DiveLogBody = props => {
  const entries = props.diveData.map((entry, index) => {
    entry["dive_num"] = props.diveData.length - index;
    return (
      <DiveEntry entryData={entry}/>
    )
  })

  return entries;
}

class DiveLog extends React.Component {
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
        <div className='dive_log' style={dive_log_style}>
          <DiveLogBody diveData={diveData} onClick={this.onEntryClick}/>
          <Fab style={add_dive_style} className='add_dive' color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
    )
  }
}

export default DiveLog;