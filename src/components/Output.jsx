import React from 'react';
import * as PropTypes from 'prop-types';

function Output({ children }) {
  return <p>{children}</p>;
}

Output.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Output;
