import { getCurrentDiveData, getDiveById } from '../src/redux/selectors';

test('selectors return the selected dive from the current store shape', () => {
  const selectedDive = { dive_id: 'dive-2', location: { name: 'Blue lagoon' } };
  const state = {
    dives: {
      diveList: [
        { dive_id: 'dive-1' },
        selectedDive,
      ],
      current_dive: 'dive-2',
    },
  };

  expect(getDiveById(state, 'dive-2')).toBe(selectedDive);
  expect(getCurrentDiveData(state)).toBe(selectedDive);
});
