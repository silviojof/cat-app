import React from 'react';
import PropTypes from 'prop-types';
import styles from './Spinner.module.scss';

const Spinner = ({ colored }) => (
  <div className={[styles.spinner, colored ? styles.colored : ''].join(' ')}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

Spinner.propTypes = {
  colored: PropTypes.bool,
}

Spinner.defaultProps = {
  colored: false,
}

export default Spinner;