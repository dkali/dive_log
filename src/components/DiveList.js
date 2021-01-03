import React from 'react';
import DiveEntry from './DiveEntry';
import { connect } from "react-redux";
import { getDiveList } from "../redux/selectors";

const DiveList = ({ dives }) => {
  return dives.map((dive, index) =>
    <DiveEntry entryData={dive}
      key={index}
      dive_num={dives.length - index} />
  );
}

const mapStateToProps = state => {
  const dives = getDiveList(state);
  return { dives };
}

export default connect(mapStateToProps)(DiveList);