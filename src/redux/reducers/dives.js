import { ADD_DIVE, SELECT_DIVE, EDIT_DIVE, DELETE_DIVE } from "../actionTypes"

const initialState = {
  allIds: [1, 2, 3],
  byIds: {
    1: {
      dive_num: 1,
      date: "Mar 20, 2019",
      site: "Blue lagoon",
      depth: 30,
      duration: 25,
      lat: 56.265644,
      lon: 44.880680
    },
    2: {
      dive_num: 2,
      date: "Apr 16, 2019",
      site: "zkpd 4",
      depth: 13,
      duration: 34,
      lat: 56.369247,
      lon: 43.773228
    },
    3: {
      dive_num: 3,
      date: "Jan 22, 2020",
      site: "Thissel wreck",
      depth: 23,
      duration: 30,
      lat: 56.687842,
      lon: 43.353961
    },
  },
  current_dive: -1, // TODO, handle empty storage
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_DIVE: {      
      let {id, content} = action.payload;
      content["dive_num"] = id;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {...state.byIds,
                [id]: content}
      }
    }

    case SELECT_DIVE: {
      return {
        ...state,
        current_dive: action.dive_id,
      }
    }

    case EDIT_DIVE: {
      let {dive_id, content} = action.payload;
      var updated_byIds = state.byIds;
      updated_byIds[dive_id] = content;
      return {
        ...state,
        byIds: updated_byIds,
      }
    }

    case DELETE_DIVE: {
      return state;
    }

    default:
      return state;
  }
}