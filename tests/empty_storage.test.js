import diveReducer from '../src/redux/reducers/dives';
import { initStore } from '../src/redux/actions';

test('dive store starts empty and can be initialized with no dives', () => {
  const initialState = diveReducer(undefined, { type: '@@test/INIT' });

  expect(initialState.diveList).toEqual([]);
  expect(initialState.init_complete).toBe(false);
  expect(diveReducer(initialState, initStore([]))).toMatchObject({
    diveList: [],
    init_complete: true,
  });
});
