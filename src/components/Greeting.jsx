/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Output from './Output';

function Greeting() {
  const [changedText, setChangedText] = useState(false);

  const clickHandler = () => {
    setChangedText((prevState) => !prevState);
  };

  return (
    <>
      <h1>Hello World!</h1>
      {!changedText ? (
        <Output>It's good to see you!</Output>
      ) : (
        <Output>Changed!</Output>
      )}
      <button type="button" onClick={clickHandler}>
        Change Text
      </button>
    </>
  );
}

export default Greeting;
