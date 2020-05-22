import React from 'react';
import DiveEntry from './DiveEntry';
import { connect } from "react-redux";
import { getDiveList } from "../redux/selectors";

const DiveList = ( {dives, handleEntryClick} ) => {
  let entries = []
  for (let ind = dives.length - 1 ; ind >= 0; ind--) {
    let dive_entry = dives[ind];
    entries.push(<DiveEntry entryData={dive_entry}
                            key={dives.length - ind}
                            dive_num={dive_entry.dive_num}
                            handleEntryClick={handleEntryClick}/>)
  }

  return entries;
}

const mapStateToProps = state => {
  const dives = getDiveList(state);
  return { dives };
}

export default connect(mapStateToProps)(DiveList);