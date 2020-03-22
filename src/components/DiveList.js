import React from 'react';
import DiveEntry from './DiveEntry';
import { connect } from "react-redux";
import { getDives } from "../redux/selectors";

const DiveList = ( {dives, handleEntryClick} ) => {
  let entries = []
  dives.forEach(dive_entry => 
    entries.push(<DiveEntry entryData={dive_entry.dive_data}
                            key={dive_entry.id}
                            dive_num={dive_entry.id}
                            handleEntryClick={handleEntryClick}/>)
  )

  return entries;
}

const mapStateToProps = state => {
  const dives = getDives(state);
  return { dives };
}

export default connect(mapStateToProps)(DiveList);