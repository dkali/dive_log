import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import AddDive from '../src/components/AddDive';
import rootReducer from '../src/redux/reducers';
import {
  createFireStoreDiveEntry,
  createFireStoreLocationEntry,
  firebaseCreateLocAndAddDive,
} from '../src/helpers/FirebaseInterface';

vi.mock('../src/components/EditDiveUI', () => ({
  default: (props) => (
    <div>
      <input aria-label="Dive Site" onChange={props.handleSiteChange} />
      <input aria-label="Depth" onChange={props.handleDepthChange} />
      <input aria-label="Duration" onChange={props.handleDurationChange} />
      <button onClick={() => props.changeSelectedLoc({
        type: 'new',
        name: 'Test site',
        loc_id: null,
        geopoint: { latitude: 56, longitude: 44 },
      })}>
        Select map point
      </button>
      <button onClick={props.handleClickSave}>Save dive</button>
    </div>
  ),
}));

vi.mock('../src/helpers/FirebaseInterface', () => ({
  createFireStoreDiveEntry: vi.fn(() => ({ user: 'user-1' })),
  createFireStoreLocationEntry: vi.fn(() => ({ name: 'Test site' })),
  firebaseCreateLocAndAddDive: vi.fn(),
  firebaseAddDive: vi.fn(),
}));

test('AddDive creates a dive and location after a new map point is selected', () => {
  const store = createStore(rootReducer);

  render(
    <Provider store={store}>
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AddDive />
      </MemoryRouter>
    </Provider>
  );

  fireEvent.change(screen.getByLabelText('Dive Site'), {
    target: { value: 'Test site' },
  });
  fireEvent.change(screen.getByLabelText('Depth'), {
    target: { value: '20' },
  });
  fireEvent.change(screen.getByLabelText('Duration'), {
    target: { value: '30' },
  });
  fireEvent.click(screen.getByText('Select map point'));
  fireEvent.click(screen.getByText('Save dive'));

  expect(createFireStoreLocationEntry).toHaveBeenCalledWith(
    expect.objectContaining({ type: 'new', geopoint: { latitude: 56, longitude: 44 } }),
    { name: 'Test site' }
  );
  expect(createFireStoreDiveEntry).toHaveBeenCalledWith(
    '20',
    '30',
    expect.any(Date),
    expect.objectContaining({ type: 'new' })
  );
  expect(firebaseCreateLocAndAddDive).toHaveBeenCalledWith(
    { name: 'Test site' },
    { user: 'user-1' }
  );
});
