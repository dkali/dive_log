export const getDivesState = store => store.dives;

export const getDiveList = store =>
  getDivesState(store) ? getDivesState(store).allIds : [];

export function getDiveById(store, id) {
  const dives = getDivesState(store);
  const dive_data = dives.byIds[id];
  return dive_data;
}

export function getCurrentDiveData(store) { 
  const dive_data = getDiveById(store, getDivesState(store).current_dive);
  return dive_data;
}

export const getDives = store =>
  getDiveList(store).map(id => getDiveById(store, id)).reverse();