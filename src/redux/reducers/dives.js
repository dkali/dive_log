import { ADD_DIVE, SELECT_DIVE, EDIT_DIVE, DELETE_DIVE, INIT_STORE } from "../actionTypes"

const initialState = {
  diveList: [
  ],
  current_dive: 0,
}

export default function(state = initialState, action) {
  var updated_diveList = null;

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
      updated_diveList = [...state.diveList];
      updated_diveList[dive_id - 1] = content;
      return {
        ...state,
        diveList: updated_diveList,
      }
    }

    case DELETE_DIVE: {
      state.diveList.splice(state.current_dive - 1, 1);
      updated_diveList = [...state.diveList];
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

    case INIT_STORE: {
      return {
        ...state,
        diveList: action.payload,
      };
    }

    default:
      return state;
  }
}
