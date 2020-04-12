// import dependencies
import React from 'react'
import '@testing-library/jest-dom/extend-expect'

// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'

// the component to test
import DiveEntry from '../src/components/DiveEntry.js'

// for async to work
import regeneratorRuntime from "regenerator-runtime";

//redux
import { Provider } from 'react-redux';
import store from '../src/redux/store'

function handleEntryClick(){

}

test('component DiveEntry: displays UI elements', async () => {
  // Arrange
  let key = 1;
  let dive_entry = {date: "Apr 6, 2020", site: "doma" }

  const { container, asFragment } = render(
    <Provider store={store}>
      <DiveEntry entryData={dive_entry}
                  key={key}
                  dive_num={key}
                  handleEntryClick={handleEntryClick}/>
    </Provider>);

  // Assert
  expect(screen.getByTestId('dive_number')).toHaveTextContent(key);
  expect(screen.getByTestId('dive_date')).toHaveTextContent(dive_entry.date);
  expect(screen.getByTestId('dive_site')).toHaveTextContent(dive_entry.site);
})

test('component DiveEntry: handle click event', async () => {
  // Arrange
  let key = 48;
  let dive_entry = {date: "Apr 6, 2020", site: "Tahoe Lake" }
  const handle_entry_click = jest.fn();

  const { container, asFragment } = render(
    <Provider store={store}>
      <DiveEntry entryData={dive_entry}
                  key={key}
                  dive_num={key}
                  handleEntryClick={handle_entry_click}/>
    </Provider>);

  // Act
  fireEvent.click(screen.getByText(dive_entry.site));

  // Assert
  expect(handle_entry_click).toHaveBeenCalledTimes(1);
})