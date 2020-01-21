import React from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DiveEntry from './DiveEntry'
import AddDiveDialog from './AddDiveDialog.js'

const DiveLogBody = props => {
  const entries = props.diveData.map((entry, index) => {
    entry["dive_num"] = props.diveData.length - index;
    return (
      <DiveEntry entryData={entry} key={props.diveData.length - index}/>
    )
  })

  return entries;
}


class DiveLog extends React.Component {
  state = {
    opened: false,
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
                       handleClickClose={this.handleClickClose}/>
      </div>
    )
  }
}

export default DiveLog;