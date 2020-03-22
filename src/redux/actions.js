import { ADD_DIVE, SELECT_DIVE, EDIT_DIVE, DELETE_DIVE } from "./actionTypes"

let nextDiveId = 4; // TODO, read from store

export const addDive = content => ({
  type: ADD_DIVE,
  payload: {
    id: nextDiveId++,
    content
  }
});

export const selectDive = id => ({
  type: SELECT_DIVE,
  dive_id: { id }
});