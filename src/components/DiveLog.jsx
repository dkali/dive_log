import React from 'react';
import DiveEntry from './DiveEntry';
import { connect } from "react-redux";
import { getDiveList } from "../redux/selectors";
import Grid from '@mui/material/Grid';

function DiveLog({dives, handleTabChange}) {
  return (
    <Grid
      container
      direction="column"
      sx={{ justifyContent: 'center', alignItems: 'stretch' }}
    >
      {dives.map((dive, index ) =>
        <Grid key={index}>
          <DiveEntry entryData={dive}
            firestore_id={dive.dive_id}
            dive_num={dives.length - index}
            handleTabChange={handleTabChange} />
        </Grid>
      )}
    </Grid>
  )
}

const mapStateToProps = state => {
  const dives = getDiveList(state);
  return { dives };
}

export default connect(mapStateToProps)(DiveLog);