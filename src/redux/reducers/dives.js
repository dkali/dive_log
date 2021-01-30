import { SELECT_DIVE, INIT_STORE, SELECT_CUR_GEOPOINT } from "../actionTypes"

const initialState = {
  diveList: [
  ],
  current_dive: 0,
  init_complete: false,
  cur_geopoint: {
    latitude: 56.336893,
    longitude: 43.986196
  }
}

export default function foo(state = initialState, action) {
  switch (action.type) {
    case SELECT_DIVE: {
      return {
        ...state,
        current_dive: action.dive_id,
      }
    }

    case SELECT_CUR_GEOPOINT: {
      return {
        ...state,
        cur_geopoint: action.geopoint,
      }
    }

    case INIT_STORE: {
      return {
        ...state,
        diveList: action.payload,
        init_complete: true
      };
    }

    default:
      return state;
  }
}
