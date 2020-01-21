import React from 'react'


class DiveEntry extends React.Component {
  render() {
    const { entryData } = this.props;

    const entry_style = {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "50px",
      background: "#495361",
      borderRadius: "12px",
      marginBottom: "10px",      
    }
    
    const dive_num_style = {
      width: "20%",
      fontSize: "x-large",
      color: "white",
      marginTop: "auto",
      marginBottom: "auto",
      marginLeft: "1em",
    }
    
    const dive_date_style = {
      width: "30%",
      color: "white",
      marginTop: "auto",
      marginBottom: "auto",
    }
    
    const dive_site_style = {
      width: "50%",
      color: "white",
      marginTop: "auto",
      marginBottom: "auto",
    }

    return(
      <div className='dive_entry' style={entry_style}>
        <div className='dive_num' style={dive_num_style}>
          {entryData.dive_num}
        </div>
        <div className='dive_date' style={dive_date_style}>
          {entryData.date}
        </div>
        <div className='dive_site' style={dive_site_style}>
          {entryData.site}
        </div>
      </div>
    )
  }
}

export default DiveEntry;