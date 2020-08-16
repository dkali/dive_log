// import dependencies
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'date-fns';
import format from "date-fns/format";
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history'

// import react-testing methods
import { render, fireEvent, waitFor, screen, getAllByTestId } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';

// the component to test
import AddDiveDialog from '../src/components/AddDiveDialog.js';
import App from '../src/components/App.js';

// for async to work
import regeneratorRuntime from "regenerator-runtime";

//redux
import { Provider } from 'react-redux';
import store from '../src/redux/store';

test('component AddDiveDialog: press Add buton invokes dialog', async () => {
  // Arrange
  const { container, asFragment } = render(
    <MemoryRouter initialEntries={["/wtf"]}
                  initialIndex={0}>
      <Provider store={store}>
        <App/>
      </Provider>
    </MemoryRouter>
    );

  // Act
  fireEvent.click(screen.getByTestId('add_new_dive_btn'));

  // Assert;
  expect(screen.getByTestId('edit_dialog_site')).toBeTruthy();
  expect(screen.getByTestId('edit_dialog_depth')).toBeTruthy();
  expect(screen.getByTestId('edit_dialog_duration')).toBeTruthy();

  //Workaround, cannot reset Router between tests
  fireEvent.click(screen.getByTestId('edit_dialog_close'));
})

test('component AddDiveDialog: initial empty values', async () => {
  // Arrange
  const { container, asFragment } = render(
    <MemoryRouter initialEntries={['/']}>
      <Provider store={store}>
        <App/>
      </Provider>
    </MemoryRouter>
    );

  // Act
  fireEvent.click(screen.getByTestId('add_new_dive_btn'));

  // Assert
  expect(screen.getByTestId('edit_dialog_site')).toHaveValue('');
  expect(screen.getByTestId('edit_dialog_depth')).toHaveValue('0');
  expect(screen.getByTestId('edit_dialog_duration')).toHaveValue('0');
  const d = new Date(Date.now());
  expect(screen.getByTestId('edit_dialog_date-picker-inline')).toHaveValue(format(d, "MMM dd, yyyy"));

  //Workaround, cannot reset Router between tests
  fireEvent.click(screen.getByTestId('edit_dialog_close'));
})

test('component AddDiveDialog: Users input displayed', async () => {
  // Arrange
  const history = createMemoryHistory()
  history.push('/some/bad/route')
  const { container, asFragment } = render(
    <Router history={history}>
      <Provider store={store}>
        <App/>
      </Provider>
    </Router>
    );

  const test_values = {site: "Ozero 4",
                       depth: 23,
                       duration: 45}

  // Act
  fireEvent.click(screen.getByTestId('add_new_dive_btn'));
  fireEvent.change(screen.getByTestId('edit_dialog_site'), {
    target: {value: test_values.site},
  });
  fireEvent.change(screen.getByTestId('edit_dialog_depth'), {
    target: {value: test_values.depth},
  })
  fireEvent.change(screen.getByTestId('edit_dialog_duration'), {
    target: {value: test_values.duration},
  })
  
  // Assert
  expect(screen.getByTestId('edit_dialog_site')).toHaveValue(test_values.site);
  expect(screen.getByTestId('edit_dialog_depth')).toHaveValue(test_values.depth.toString());
  expect(screen.getByTestId('edit_dialog_duration')).toHaveValue(test_values.duration.toString());
  const d = new Date(Date.now());
  expect(screen.getByTestId('edit_dialog_date-picker-inline')).toHaveValue(format(d, "MMM dd, yyyy"));

  //Workaround, cannot reset Router between tests
  fireEvent.click(screen.getByTestId('edit_dialog_close'));
})

test('component AddDiveDialog: Cancel button clears input', async () => {
  // Arrange
  const { container, asFragment } = render(
    <MemoryRouter initialEntries={['/']}>
      <Provider store={store}>
        <App/>
      </Provider>
    </MemoryRouter>
    );

  const test_values = {site: '',
                       depth: 0,
                       duration: 0}

  // Act
  // open dialog
  fireEvent.click(screen.getByTestId('add_new_dive_btn'));
  // fill in values
  fireEvent.change(screen.getByTestId('edit_dialog_site'), {
    target: {value: test_values.site},
  });
  fireEvent.change(screen.getByTestId('edit_dialog_depth'), {
    target: {value: test_values.depth},
  })
  fireEvent.change(screen.getByTestId('edit_dialog_duration'), {
    target: {value: test_values.duration},
  })
  // close dialog
  fireEvent.click(screen.getByTestId('edit_dialog_close'));
  // open dialog again
  fireEvent.click(screen.getByTestId('add_new_dive_btn'));
  
  // Assert
  expect(screen.getByTestId('edit_dialog_site')).toHaveValue(test_values.site);
  expect(screen.getByTestId('edit_dialog_depth')).toHaveValue(test_values.depth.toString());
  expect(screen.getByTestId('edit_dialog_duration')).toHaveValue(test_values.duration.toString());
  const d = new Date(Date.now());
  expect(screen.getByTestId('edit_dialog_date-picker-inline')).toHaveValue(format(d, "MMM dd, yyyy"));

  //Workaround, cannot reset Router between tests
  fireEvent.click(screen.getByTestId('edit_dialog_close'));
})

test('component AddDiveDialog: Add new dive', async () => {
  // Arrange
  const history = createMemoryHistory();
  history.push('/');

  const { container, asFragment } = render(
    <MemoryRouter initialEntries={['/']}>
      <Provider store={store}>
        <App/>
      </Provider>
    </MemoryRouter>
    );

  const test_values = {site: 'Ozero 5',
                       depth: 13,
                       duration: 20}

  // Act
  const prev_len = screen.getAllByTestId('dive_entry').length;
  // open dialog
  fireEvent.click(screen.getByTestId('add_new_dive_btn'));
  // fill in values
  fireEvent.change(screen.getByTestId('edit_dialog_site'), {
    target: {value: test_values.site},
  });
  fireEvent.change(screen.getByTestId('edit_dialog_depth'), {
    target: {value: test_values.depth},
  })
  fireEvent.change(screen.getByTestId('edit_dialog_duration'), {
    target: {value: test_values.duration},
  })
  // Save dive
  fireEvent.click(screen.getByTestId('edit_dialog_save'));
  
  // Assert
  expect(screen.getAllByTestId('dive_entry')).toHaveLength(prev_len + 1);
})