import React from 'react';
import DiveEntry from './DiveEntry';
import { connect } from "react-redux";
import { getDives } from "../redux/selectors";

const DiveList = ({ dives }) => {
  let entries = []
  dives.forEach(dive_data => 
    entries.push(<DiveEntry entryData={dive_data} key={dive_data.id}/>)
  )

  return entries;
}

const mapStateToProps = state => {
  const dives = getDives(state);
  return { dives };
}

export default connect(mapStateToProps)(DiveList);