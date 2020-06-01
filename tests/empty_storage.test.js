// import dependencies
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'date-fns';

// import react-testing methods
import { render, fireEvent, waitFor, screen, getAllByTestId } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';

// the component to test
import Tabs from '../src/components/Tabs.js';

// for async to work
import regeneratorRuntime from "regenerator-runtime";

//redux
import { Provider } from 'react-redux';
import store from '../src/redux/store';

jest.mock('../src/redux/selectors')

test('component DiveList: start when no dives saved', async () => {
  // Arrange
  const dives = {
    diveList: [],
    current_dive: 0,
  };

  const foo = require('../src/redux/selectors');
  foo.getDivesState.mockImplementation(() => dives);
  foo.getDiveList.mockImplementation(() => dives.diveList);

  const { container, asFragment } = render(
    <Provider store={store}>
      <Tabs/>
    </Provider>);

  const test_values = {site: 'Ozero 5',
                       depth: 13,
                       duration: 20}
  
  // Assert
  expect(screen.queryAllByTestId('dive_entry')).toHaveLength(0);
})