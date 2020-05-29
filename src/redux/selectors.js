export const getDivesState = store => store.dives;

export const getDiveList = store =>
  getDivesState(store) ? getDivesState(store).diveList : [];

export function getDiveById(store, id) {
  if (id < 0 || getDivesState(store).diveList.length === 0) {
    return {};
  }
  return getDivesState(store).diveList[id - 1];
}

export function getCurrentDiveData(store) { 
  return getDiveById(store, getDivesState(store).current_dive);
}