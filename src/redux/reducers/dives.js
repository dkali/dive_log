import { ADD_DIVE, EDIT_DIVE, DELETE_DIVE } from "../actionTypes"

const initialState = {
  allIds: [1, 2, 3],
  byIds: {
    1: {
      date: "03.20.2019",
      site: "Blue lagoon",
      depth: 30,
      duration: 25,
      lat: 56.265644,
      lon: 44.880680
    },
    2: {
      date: "04.16.2019",
      site: "zkpd 4",
      depth: 13,
      duration: 34,
      lat: 56.369247,
      lon: 43.773228
    },
    3: {
      date: "01.22.2020",
      site: "Thissel wreck",
      depth: 23,
      duration: 30,
      lat: 56.687842,
      lon: 43.353961
    },
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_DIVE: {      
      const {id, content} = action.payload
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {...state.byIds,
                [id]: content}
      }
    }

    case EDIT_DIVE: {
      return state;
    }

    case DELETE_DIVE: {
      return state;
    }

    default:
      return state;
  }
}