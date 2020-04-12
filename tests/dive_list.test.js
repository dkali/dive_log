// import dependencies
import React from 'react'
import '@testing-library/jest-dom/extend-expect'

// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'

// the component to test
import DiveList from '../src/components/DiveList.js'

// for async to work
import regeneratorRuntime from "regenerator-runtime";

//redux
import { Provider } from 'react-redux';
import store from '../src/redux/store'

// mock implementation
jest.mock('../src/redux/selectors')

test('component DiveList: display all dives from a list', async () => {
  // Arrange
  const handle_entry_click = jest.fn();
  const dives = [{date: "Apr 6, 2020", site: "doma 1" },
                 {date: "Apr 6, 2020", site: "doma 2" },
                 {date: "Apr 6, 2020", site: "doma 3" },
                 {date: "Apr 6, 2020", site: "doma 4" }]
  const foo = require('../src/redux/selectors');
  foo.getDives.mockImplementation(() => dives);

  const { container, asFragment } = render(
    <Provider store={store}>
      <DiveList handleEntryClick={handle_entry_click}/>
    </Provider>);

  // Assert
  expect(screen.queryAllByTestId('dive_entry')).toHaveLength(dives.length);
})