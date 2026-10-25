import diveReducer from '../src/redux/reducers/dives';
import { initStore, selectDive, selectCurrentGeopoint } from '../src/redux/actions';

test('initializes dive list and selection', () => {
  const dives = [{ dive_id: 'dive-1' }];
  const nextState = diveReducer(undefined, initStore(dives));

  expect(nextState.diveList).toEqual(dives);
  expect(nextState.init_complete).toBe(true);
  expect(nextState.current_dive).toBe(0);
});

test('updates selected dive and map center', () => {
  const geopoint = { latitude: 56, longitude: 44 };
  const previousState = diveReducer(undefined, initStore([{ dive_id: 'dive-1' }]));
  const selectedState = diveReducer(previousState, selectDive('dive-1'));
  const nextState = diveReducer(selectedState, selectCurrentGeopoint(geopoint));

  expect(nextState.current_dive).toBe('dive-1');
  expect(nextState.cur_geopoint).toEqual(geopoint);
});
