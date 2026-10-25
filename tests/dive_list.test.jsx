import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import DiveLog from '../src/components/DiveLog';
import rootReducer from '../src/redux/reducers';
import { initStore } from '../src/redux/actions';

test('DiveLog displays entries from the Redux store', () => {
  const dives = [
    {
      dive_id: 'dive-1',
      date: { seconds: 1586131200 },
      depth: 13,
      duration: 20,
      location: { name: 'Ozero 1', geopoint: { latitude: 56, longitude: 44 } },
    },
    {
      dive_id: 'dive-2',
      date: { seconds: 1586131200 },
      depth: 18,
      duration: 30,
      location: { name: 'Ozero 2', geopoint: { latitude: 57, longitude: 45 } },
    },
  ];
  const store = createStore(rootReducer);
  store.dispatch(initStore(dives));

  render(
    <Provider store={store}>
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <DiveLog />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText('Ozero 1')).toBeInTheDocument();
  expect(screen.getByText('Ozero 2')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Ozero 2'));
  expect(store.getState().dives.current_dive).toBe('dive-2');
});
