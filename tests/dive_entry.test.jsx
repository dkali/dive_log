import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import DiveEntry from '../src/components/DiveEntry';
import rootReducer from '../src/redux/reducers';

const dive = {
  date: { seconds: 1586131200 },
  depth: 30,
  duration: 25,
  location: {
    name: 'Blue lagoon',
    geopoint: { latitude: 56.265644, longitude: 44.88068 },
  },
};

test('DiveEntry shows dive information and selects its dive when clicked', () => {
  const store = createStore(rootReducer);

  render(
    <Provider store={store}>
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <DiveEntry entryData={dive} dive_num={1} firestore_id="dive-1" />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText('Blue lagoon')).toBeInTheDocument();
  expect(screen.getByText('Apr 06, 2020')).toBeInTheDocument();
  expect(screen.getByText('30')).toBeInTheDocument();
  expect(screen.getByText('25')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Blue lagoon'));
  expect(store.getState().dives.current_dive).toBe('dive-1');
  expect(store.getState().dives.cur_geopoint).toEqual(dive.location.geopoint);
});
