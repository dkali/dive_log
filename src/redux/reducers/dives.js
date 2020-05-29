import { ADD_DIVE, SELECT_DIVE, EDIT_DIVE, DELETE_DIVE } from "../actionTypes"

const initialState = {
  diveList: [
    {
      dive_num: 1,
      date: "Mar 20, 2019",
      site: "Blue lagoon",
      depth: 30,
      duration: 25,
      lat: 56.265644,
      lon: 44.880680
    },
    {
      dive_num: 2,
      date: "Apr 16, 2019",
      site: "zkpd 4",
      depth: 13,
      duration: 34,
      lat: 56.369247,
      lon: 43.773228
    },
    {
      dive_num: 3,
      date: "Jan 22, 2020",
      site: "Thissel wreck",
      depth: 23,
      duration: 30,
      lat: 56.687842,
      lon: 43.353961
    },
  ],
  current_dive: 0, // TODO, handle empty storage
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_DIVE: {
      let {content} = action.payload;
      content["dive_num"] = state.diveList.length + 1;

      return {
        ...state,
        diveList: [...state.diveList, content]
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
      var updated_diveList = [...state.diveList];
      updated_diveList[dive_id - 1] = content;
      return {
        ...state,
        diveList: updated_diveList,
      }
    }

    case DELETE_DIVE: {
      state.diveList.splice(state.current_dive - 1, 1);
      var updated_diveList = [...state.diveList];
      // re-enumerate dives after deletion
      for (let i = 0; i < updated_diveList.length; i++) {
        updated_diveList[i].dive_num = i + 1;
      }

      return {
        ...state,
        diveList: updated_diveList,
        current_dive: updated_diveList.length,
      };
    }

    default:
      return state;
  }
}