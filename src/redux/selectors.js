export const getDivesState = store => store.dives;

export const getDiveList = store =>
  getDivesState(store) ? getDivesState(store).allIds : [];

export const getDiveById = (store, id) =>
  getDivesState(store) ? { ...getDivesState(store).byIds[id], id} : {};

export const getDives = store =>
  getDiveList(store).map(id => getDiveById(store, id)).reverse();