import React from 'react'
import './DiveEntry.css'

class DiveEntry extends React.Component {
  render() {
    return(
      <div className='dive_entry'>
        <div className='dive_num'>
          13
        </div>
        <div className='dive_date'>
          12.24.2019
        </div>
        <div className='dive_site'>
          Thistlegorm
        </div>
      </div>
    )
  }
}

export default DiveEntry;