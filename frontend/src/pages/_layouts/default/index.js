import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

export default function AuthDefault({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

AuthDefault.propTypes = {
  children: PropTypes.element.isRequired,
};
