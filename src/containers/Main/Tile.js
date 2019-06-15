import React from 'react';
import styles from './Main.module.scss';

const Tile = ({src}) => {
  return (
    <div className={styles.tile}>
			<img src={src} alt={src}/>
		</div>
  );
};

export default Tile;