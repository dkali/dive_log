import React from 'react';
import DiveEntry from './DiveEntry';
import { connect } from "react-redux";
import { getDives } from "../redux/selectors";

const DiveList = ( {dives, handleEntryClick} ) => {
  let entries = []
  for (let ind = 0; ind < dives.length; ind++) {
    let dive_entry = dives[ind];
    entries.push(<DiveEntry entryData={dive_entry}
                            key={dives.length - ind}
                            dive_num={dives.length - ind}
                            handleEntryClick={handleEntryClick}/>)
  }

  return entries;
}

const mapStateToProps = state => {
  const dives = getDives(state);
  return { dives };
}

export default connect(mapStateToProps)(DiveList);