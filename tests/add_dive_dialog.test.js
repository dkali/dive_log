// import dependencies
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import 'date-fns';
import format from "date-fns/format";


// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'

// the component to test
import AddDiveDialog from '../src/components/AddDiveDialog.js'
import Tabs from '../src/components/Tabs.js'

// for async to work
import regeneratorRuntime from "regenerator-runtime";

//redux
import { Provider } from 'react-redux';
import store from '../src/redux/store'

// test('component AddDiveDialog: press Add buton invokes dialog', async () => {
//   // Arrange
//   const { container, asFragment } = render(
//     <Provider store={store}>
//       <Tabs/>
//     </Provider>);

//   // Act
//   fireEvent.click(screen.getByTestId('add_new_dive_btn'));

//   // Assert
//   expect(screen.getByTestId('add_dive_dialog')).toHaveAttribute('opened', 'true');
// })

test('component AddDiveDialog: initial empty values', async () => {
  // Arrange
  const handleClickAddDiveClose = jest.fn();
  const { container, asFragment } = render(
    <Provider store={store}>
      <AddDiveDialog data-testid={'add_dive_dialog'}
                     opened={true}
                     dialog_view_state={"add"}
                     handleClickClose={handleClickAddDiveClose}/>
    </Provider>);

  // Assert
  expect(screen.getByTestId('edit_dialog_site')).toHaveValue('');
  expect(screen.getByTestId('edit_dialog_depth')).toHaveValue('0');
  expect(screen.getByTestId('edit_dialog_duration')).toHaveValue('0');
  const d = new Date(Date.now());
  expect(screen.getByTestId('edit_dialog_date-picker-inline')).toHaveValue(format(d, "MMM dd, yyyy"));
})

test('component AddDiveDialog: User\'s input displayed ', async () => {
  // Arrange
  const { container, asFragment } = render(
    <Provider store={store}>
      <Tabs/>
    </Provider>);

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
})

test('component AddDiveDialog: Cancel button clears input', async () => {
  // Arrange
  const { container, asFragment } = render(
    <Provider store={store}>
      <Tabs/>
    </Provider>);

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
})