import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import EditDiveUI from '../src/components/EditDiveUI';

vi.mock('../src/components/MapContainer', () => ({
  default: (props) => (
    <button onClick={() => props.mapClicked({
      latLng: {
        lat: () => 56.5,
        lng: () => 44.5,
      },
    })}>
      Click map
    </button>
  ),
}));

vi.mock('@react-google-maps/api', () => ({
  GoogleMap: () => null,
  Marker: () => null,
  useJsApiLoader: () => ({ isLoaded: true }),
}));

test('map click selects a new dive location with its coordinates', () => {
  global.google = {
    maps: {
      Size: vi.fn(),
      Point: vi.fn(),
    },
  };
  const changeSelectedLoc = vi.fn();

  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <EditDiveUI
        dive_data={{
          selected_loc: {},
          location: { name: '' },
          depth: 0,
          duration: 0,
          date: new Date('2020-04-06T00:00:00Z'),
          input_valid: false,
        }}
        changeSelectedLoc={changeSelectedLoc}
        handleSiteChange={vi.fn()}
        handleDateChange={vi.fn()}
        handleDepthChange={vi.fn()}
        handleDurationChange={vi.fn()}
        handleClickSave={vi.fn()}
        handleClickClose={vi.fn()}
      />
    </MemoryRouter>
  );

  expect(screen.getByTestId('edit_dialog_date-picker-inline')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Click map'));

  expect(changeSelectedLoc).toHaveBeenCalledWith(expect.objectContaining({
    type: 'new',
    geopoint: expect.objectContaining({ latitude: 56.5, longitude: 44.5 }),
  }));

  delete global.google;
});
