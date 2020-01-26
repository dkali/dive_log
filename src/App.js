import React from 'react'
import SimpleTabs from './Tabs'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dive_data: [
        {
          date: "03.20.2019",
          site: "Blue lagoon",
          depth: 30,
          duration: 25,
          lat: 56.340,
          lon: 43.977
        },
        {
          date: "04.16.2019",
          site: "zkpd 4",
          depth: 13,
          duration: 34,
          lat: 56.340,
          lon: 43.977
        },
        {
          date: "01.22.2020",
          site: "Thissel wreck",
          depth: 23,
          duration: 30,
          lat: 56.340,
          lon: 43.977
        },
      ]
    };

    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  handleSaveClick = entry_data => {
    var diveData = this.state.dive_data;
    diveData.push(entry_data)
    this.setState({dive_data: diveData})
  }

  render() {
    const dive_data = this.state.dive_data;

    return(
      <div className='app'>
        <SimpleTabs diveData={dive_data} handleSaveClick={this.handleSaveClick}/>
      </div>
    )
  }
}

export default App;