export const getDivesState = store => store.dives;

export const getDiveList = store =>
  getDivesState(store) ? getDivesState(store).diveList : [];

export function getDiveById(store, id) {
  if (id < 0 || getDivesState(store).diveList.length === 0) {
    return undefined;
  }
  return getDivesState(store).diveList.find(elem => elem.dive_id === id)
}

export function getCurrentDiveData(store) { 
  return getDiveById(store, getDivesState(store).current_dive);
}

export function getCurrentDiveID(store) {
  return getDivesState(store).current_dive;
}

export function getInitComplete(store) {
  return getDivesState(store).init_complete;
}

export function getCurGeopoint(store) {
  return getDivesState(store).cur_geopoint;
}