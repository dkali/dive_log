import React from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DiveEntry from './DiveEntry'

class DiveLog extends React.Component {
  render() {

    return (
      <div>
        <div className='dive_log'>
          {/* <DiveList> */}
          <DiveEntry/>
          <DiveEntry/>
          <DiveEntry/>
          <DiveEntry/>
          <DiveEntry/>
          <DiveEntry/>
          <DiveEntry/>
          <DiveEntry/>
          <DiveEntry/>
          <DiveEntry/>
          <DiveEntry/>
          <DiveEntry/>
          <Fab className='add_dive' color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
    )
  }
}

export default DiveLog;