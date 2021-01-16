import { SELECT_DIVE, INIT_STORE } from "./actionTypes"

export const selectDive = id => ({
  type: SELECT_DIVE,
  dive_id: id,
});

export const initStore = content => ({
  type: INIT_STORE,
  payload: content,
});