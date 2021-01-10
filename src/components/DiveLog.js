import React from 'react';
import DiveList from './DiveList.js';

class DiveLog extends React.Component {
  
  render() {
    const dive_log_style = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "8px",
      position: "relative",
    }

    return (
      <div data-testid={'dive_log'}>
        <div style={dive_log_style}>
          <DiveList handleTabChange={this.props.handleTabChange}/>
        </div>
      </div>
    )
  }
}

export default DiveLog;