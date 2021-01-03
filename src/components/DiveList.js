import React from 'react';
import DiveEntry from './DiveEntry';
import { connect } from "react-redux";
import { getDiveList } from "../redux/selectors";

const DiveList = ({ dives, handleTabChange }) => {
  return dives.map((dive, index ) =>
    <DiveEntry entryData={dive}
      key={index}
      firestore_id={dive.dive_id}
      dive_num={dives.length - index}
      handleTabChange={handleTabChange} />
  );
}

const mapStateToProps = state => {
  const dives = getDiveList(state);
  return { dives };
}

export default connect(mapStateToProps)(DiveList);