import { SELECT_DIVE, INIT_STORE } from "../actionTypes"

const initialState = {
  diveList: [
  ],
  current_dive: 0,
}

export default function foo(state = initialState, action) {
  switch (action.type) {
    case SELECT_DIVE: {
      return {
        ...state,
        current_dive: action.dive_id,
      }
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
