// import dependencies
import React from 'react'
import '@testing-library/jest-dom/extend-expect'

// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'

// the component to test
import Tabs from '../src/components/Tabs.js'

// for async to work
import regeneratorRuntime from "regenerator-runtime";

//redux
import { Provider } from 'react-redux';
import store from '../src/redux/store'

test('component Tabs: display Dive Log', async () => {
  // Arrange
  const { container, asFragment } = render(
    <Provider store={store}>
      <Tabs/>
    </Provider>);

  // Act
  fireEvent.click(screen.getByTestId('dive_log_tab'));

  // Assert
  expect(screen.getByTestId('dive_log')).toBeTruthy();
})

test('component Tabs: display Map', async () => {
  // Arrange
  const { container, asFragment } = render(
    <Provider store={store}>
      <Tabs/>
    </Provider>);

  // Act
  fireEvent.click(screen.getByTestId('map_tab'));

  // Assert
  // TODO
  // expect(screen.getByTestId('map_view')).toBeTruthy();
})