import React from 'react';
import { render, screen } from '@testing-library/react';
import Async from './Async';

describe('Async component should', () => {
  // the naive approach to testing a component that interacts with some remote API
  // is using "async-await-find"(RTL methods with 'find' prefix usually return a Promise) combo.
  // But in reality we don't want to do it like this because:
  // - we don't want to create unnecessary network traffic which can be OK for GET requests,
  // BUT can be CRITICAL for PUT requests!
  // - we don't want to create records inside some Database.
  // - we don't want to rely on some remote server that can be down!
  // - we don't want to TEST CODE NOT WRITTEN BY US (so we don't want to test if the list items
  // will be rendered after successful "fetch" function completion in a straightforward way,
  // because "fetch" is not a code that we wrote and that's why we need to AVOID TESTING IT)
  // ========================
  // So 2 main correct approaches are:
  // 1) Using some special test server (but it is more of an integration test in this case).
  // 2) NOT sending request AT ALL (using MOCKS).
  test('render posts if request succeeds', async () => {
    // So we need to mock "fetch":
    // STEP-1:
    // temporarily replace globally available "fetch" method with a mock provided by Jest
    window.fetch = jest.fn();
    // STEP-2:
    // Because we know that "fetch" returns a Promise that:
    // - resolves to a Response object(if it is successful);
    // - this object has async "json" method which we can call to "unpack" the data;
    // - the data is an array of objects with "id" and "text" fields.
    // Here we mock resolved value with exactly such an object:
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', text: 'Bla bla bla' }],
    });
    render(<Async />);
    const listElements = await screen.findAllByRole('listitem');
    expect(listElements).not.toHaveLength(0);
  });
});
