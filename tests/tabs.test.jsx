import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import SimpleTabs from '../src/components/Tabs';
import rootReducer from '../src/redux/reducers';

vi.mock('../src/components/MapContainer', () => ({
  default: () => <div data-testid="map-view">Map view</div>,
}));

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query.includes('max-width'),
    media: query,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

test('switches between the dive log and map tabs', () => {
  const store = createStore(rootReducer);

  render(
    <Provider store={store}>
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SimpleTabs />
      </MemoryRouter>
    </Provider>
  );

  fireEvent.click(screen.getByRole('tab', { name: 'Dive Log' }));
  expect(screen.getByTestId('add_new_dive_btn')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('tab', { name: 'Map' }));
  expect(screen.getByTestId('map-view')).toBeInTheDocument();
});
