import React from 'react';
import { connect } from "react-redux";
import { selectDive, selectCurrentGeopoint } from "../redux/actions";
import 'date-fns';
import format from "date-fns/format";
import fromUnixTime from 'date-fns/fromUnixTime'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import { Check, Height, Timelapse, Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { NavLink } from 'react-router-dom';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  width: '100%',
  padding: '8px 16px',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
}));

function DiveEntry(props) {
  const { entryData, dive_num } = props;

  const handleClick = () => {
    props.selectDive(props.firestore_id);
    props.selectCurrentGeopoint(entryData.location.geopoint);
    if (props.handleTabChange !== undefined) {
      props.handleTabChange(null, 1);
    }
  }

  return (
    <StyledListItem onClick={handleClick}>
      <StyledPaper>
        <Box
          bgcolor="primary.main"
          color="primary.contrastText"
          sx={{ boxSizing: 'border-box', height: 114, p: 2, position: 'relative' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: -1, ml: -1 }}>
              {entryData.location.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ flexShrink: 0 }}>
              {format(fromUnixTime(entryData.date.seconds), 'MMM dd, yyyy')}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Check fontSize="small" />
              <Typography variant="body2">{dive_num}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Height fontSize="small" />
              <Typography variant="body2">{entryData.depth}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Timelapse fontSize="small" />
              <Typography variant="body2">{entryData.duration}</Typography>
            </Box>
          </Box>

          <IconButton
            aria-label={`Edit dive at ${entryData.location.name}`}
            sx={{ position: 'absolute', top: '43%', right: '14%' }}
          >
            <NavLink to={`/dive/${props.firestore_id}`} aria-label={`Edit dive at ${entryData.location.name}`}>
              <Edit />
            </NavLink>
          </IconButton>
        </Box>
      </StyledPaper>
    </StyledListItem>
  )
}

export default connect(
  null,
  { selectDive, selectCurrentGeopoint }
)(DiveEntry);