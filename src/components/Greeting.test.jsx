import React from 'react';
// To be able to write and then run tests we need 2 things:
// 1) Some tool that can:
// - RUN the test;
// - and ASSERT (compare execution VS expectation results) the result of the test.
// In React ecosystem it is common to use "Jest" which does these 2 things.
// Although it is not the only tool for this (e.g. Vite).
// By the way Jest is not just a test runner but also a testing framework.
// 2) Some tool that can:
// - RENDER the React component (in React app we test components a lot of the time);
// - make QUERIES to the DOM to find specific DOM-elements
// in order for them to be later asserted by test runner (e.g. Jest)
// In React it is quite common to use "React Testing Library"
// but once again this is not the only tool available (e.g. Enzyme)
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Greeting from './Greeting';

// to create a Test Suite (it can be helpful if we have a lot of tests
// and want to organize/group them) we use "describe" function:
describe('Greeting component should', () => {
  // no matter what function to run the test we use (e.g. "test", "it")
  // the parameters are the same:
  // - test name/title/description;
  // - function to be tested;
  test('render "Hello World!" text', () => {
    // In general each test can have 3 phases:
    // 1) ARRANGE (set up the test data, condition, environment etc.)
    // In the current test case we render component during this phase:
    render(<Greeting />);

    // 2) ACT (run the logic that should be tested, e.g. call the function)
    // In the current test case we don't have this phase

    // 3) ASSERT (compare execution results VS expectations)
    // In the current test case we have this phase:
    const element = screen.getByText('Hello World!');
    expect(element).toBeInTheDocument();
  });

  test('render "It\'s good to see you!" text before clicking the button', () => {
    render(<Greeting />);
    const element = screen.getByText("It's good to see you!");
    expect(element).toBeInTheDocument();
  });

  test('render "Changed!" text after clicking the button', () => {
    render(<Greeting />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    const element = screen.getByText('Changed!');
    expect(element).toBeInTheDocument();
  });

  test('does not render "It\'s good to see you!" text after clicking the button', () => {
    render(<Greeting />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    const element = screen.queryByText('"It\'s good to see you!"');
    expect(element).toBeNull();
  });
});
