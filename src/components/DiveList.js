import React from 'react';
import DiveEntry from './DiveEntry';
import { connect } from "react-redux";
import { getDiveList } from "../redux/selectors";

const DiveList = ({ dives, handleEntryClick }) => {
  return dives.map((dive, index) =>
    <DiveEntry entryData={dive}
      key={index}
      dive_num={dives.length - index}
      handleEntryClick={handleEntryClick} />
  );
}

const mapStateToProps = state => {
  const dives = getDiveList(state);
  return { dives };
}

export default connect(mapStateToProps)(DiveList);