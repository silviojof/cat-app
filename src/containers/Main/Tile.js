import React from 'react';
import PropTypes from 'prop-types';
import styles from './Main.module.scss';

const Tile = ({ src }) => {
  return (
    <div className={styles.tile}>
			<img src={src} alt={src}/>
		</div>
  );
};

Tile.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Tile;