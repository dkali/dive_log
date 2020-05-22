// import dependencies
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'date-fns';
import format from "date-fns/format";

// import react-testing methods
import { render, fireEvent, waitFor, screen, getAllByTestId } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';

// the component to test
import EditDiveDialog from '../src/components/EditDiveDialog.js';
import Tabs from '../src/components/Tabs.js';

// for async to work
import regeneratorRuntime from "regenerator-runtime";

//redux
import { Provider } from 'react-redux';
import store from '../src/redux/store';

jest.mock('../src/redux/selectors')

test('component EditDiveDialog: display currently selected dive data', async () => {
  // Arrange
  const handle_close_click = jest.fn();
  const dives = {
    allIds: [1, 2, 3],
    byIds: {
      1: {
        dive_num: 1,
        date: "Mar 20, 2019",
        site: "Blue lagoon",
        depth: 30,
        duration: 25,
        lat: 56.265644,
        lon: 44.880680
      },
      2: {
        dive_num: 2,
        date: "Mar 20, 2019",
        site: "Red lagoon",
        depth: 30,
        duration: 25,
        lat: 56.265644,
        lon: 44.880680
      }
    },
    current_dive: 2,
  };
  const test_dive = dives.byIds[1];

  const foo = require('../src/redux/selectors');
  foo.getDivesState.mockImplementation(() => dives);
  foo.getDiveList.mockImplementation(() => dives.allIds);
  foo.getDiveById.mockImplementation(() => test_dive);
  // getCurrentDiveData mocked twice to trigger change in props for EditDiveDialog,
  // that are checked in componentDidUpdate 
  foo.getCurrentDiveData.mockReturnValueOnce(dives.byIds[2]).mockReturnValue(test_dive);
  foo.getDiveList.mockImplementation(() => [test_dive]);

  const { container, asFragment } = render(
    <Provider store={store}>
      <Tabs />
    </Provider>);

  // Act
  fireEvent.click(screen.getAllByTestId('dive_entry')[0]);
  fireEvent.click(screen.getByTestId('edit_icon'));

  // Assert
  expect(screen.getByTestId('edit_dialog_site')).toHaveValue(test_dive.site);
  expect(screen.getByTestId('edit_dialog_depth')).toHaveValue(test_dive.depth.toString());
  expect(screen.getByTestId('edit_dialog_duration')).toHaveValue(test_dive.duration.toString());
  expect(screen.getByTestId('edit_dialog_date-picker-inline')).toHaveValue(test_dive.date);
})
