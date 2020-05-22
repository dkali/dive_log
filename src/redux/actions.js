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
  dive_id: id,
});

export const editDive = (id, content) => ({
  type: EDIT_DIVE,
  payload: {
    dive_id: id,
    content
  }
});

export const deleteDive = id => ({
  type: DELETE_DIVE,
})