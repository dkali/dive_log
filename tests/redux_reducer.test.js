// import dependencies
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'date-fns';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';

// for async to work
import regeneratorRuntime from "regenerator-runtime";

//redux
import diveReducer from '../src/redux/reducers/dives';
import { addDive, selectDive, editDive, deleteDive } from '../src/redux/actions';

test('component Reducers: remove action', async () => {
  // Arrange
  const previousState = {
    diveList: [
      {
        dive_num: 1,
        date: "Mar 20, 2019",
        site: "Blue lagoon",
        depth: 30,
        duration: 25,
        lat: 56.265644,
        lon: 44.880680
      },
    ],
    current_dive: 1,
  };

  const expectedNewState = {
    diveList: [],
    current_dive: 0
  }

  // Act
  const newState = diveReducer(previousState, deleteDive());

  // Assert
  expect(newState).toEqual(expectedNewState);
})

test('component Reducers: add action', async () => {
  // Arrange
  const previousState = {
    diveList: [],
    current_dive: 0
  }

  const content = {
    dive_num: 1,
    date: "Mar 20, 2019",
    site: "Blue lagoon",
    depth: 30,
    duration: 25,
    lat: 56.265644,
    lon: 44.880680
  }

  const expectedNewState = {
    diveList: [
      content,
    ],
    current_dive: 0,
  };

  // Act
  const newState = diveReducer(previousState, addDive(content));

  // Assert
  expect(newState).toEqual(expectedNewState);
})

test('component Reducers: edit action', async () => {
  // Arrange
  const previousState = {
    diveList: [
      {
        dive_num: 1,
        date: "Mar 20, 2019",
        site: "Blue lagoon",
        depth: 30,
        duration: 25,
        lat: 56.265644,
        lon: 44.880680
      },
    ],
    current_dive: 1,
  };

  const content = {
    dive_num: 1,
    date: "Mar 21, 2019",
    site: "Red lagoon",
    depth: 31,
    duration: 26,
    lat: 56.265644,
    lon: 44.880680
  }

  const expectedNewState = {
    diveList: [
      content,
    ],
    current_dive: 1,
  };

  // Act
  const newState = diveReducer(previousState, editDive(1, content));

  // Assert
  expect(newState).toEqual(expectedNewState);
})

test('component Reducers: select action', async () => {
  // Arrange
  const previousState = {
    diveList: [
      {
        dive_num: 1,
        date: "Mar 20, 2019",
        site: "Blue lagoon",
        depth: 30,
        duration: 25,
        lat: 56.265644,
        lon: 44.880680
      },
      {
        dive_num: 2,
        date: "Mar 21, 2019",
        site: "Red lagoon",
        depth: 31,
        duration: 26,
        lat: 56.265644,
        lon: 44.880680
      }
    ],
    current_dive: 1,
  };

  const expectedNewState = {
    diveList: previousState.diveList,
    current_dive: 2,
  };

  // Act
  const newState = diveReducer(previousState, selectDive(2));

  // Assert
  expect(newState).toEqual(expectedNewState);
})