import { SELECT_DIVE, INIT_STORE, SELECT_CUR_GEOPOINT } from "./actionTypes"

export const selectDive = id => ({
  type: SELECT_DIVE,
  dive_id: id,
});

export const selectCurrentGeopoint = (geopoint) => ({
  type: SELECT_CUR_GEOPOINT,
  geopoint: geopoint,
})

export const initStore = content => ({
  type: INIT_STORE,
  payload: content,
});