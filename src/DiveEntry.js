import React from 'react';

class DiveEntry extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    // because how the fuck should I pass the parameter into callback :(
    this.props.handleEntryClick(this.props.curr_dive);
  }

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
      <div style={entry_style} onClick={this.handleClick}>
        <div style={dive_num_style}>
          {entryData.dive_num}
        </div>
        <div style={dive_date_style}>
          {entryData.date}
        </div>
        <div style={dive_site_style}>
          {entryData.site}
        </div>
      </div>
    )
  }
}

export default DiveEntry;