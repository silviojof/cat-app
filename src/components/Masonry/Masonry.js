import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Masonry.module.scss';

const Masonry = ({ breakPoints, children }) => {
  const masonryRef = useRef(null);
  const [ columns, setColumns ]= useState(1);

  const getColumns = useCallback(
    (w) => {
      return breakPoints.reduceRight((p, c, i) => c < w ? p : i, breakPoints.length);
    },
    [breakPoints]
  );

  const onResize = useCallback(
    () => {
      const offsetWidth = masonryRef.current.offsetWidth || 600;
      const newColumns = getColumns(offsetWidth);
      if(columns !== newColumns){
        setColumns(newColumns);
      }
    },
    [columns, getColumns],
  );

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return function cleanup() {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  const mapChildren = () => {
		let col = [];
		const numberOfColumns =columns;
		for(let i = 0; i < numberOfColumns; i++){
			col.push([]);
    }
		return children.reduce((acc, cur, index) => {
      acc[index%numberOfColumns].push(cur);
			return acc;
		}, col);
  }

  return (
    <div className={styles.masonry} ref={masonryRef}>
      {mapChildren().map((col, ci) => {
        return (
          <div data-testid="tile" className={styles.column} key={ci} >
            {col.map((child, i) => {
              return <div key={i}>{child}</div>
            })}
          </div>
        )
      })}
    </div>
  )
}

Masonry.propTypes = {
  breakPoints: PropTypes.array,
  children: PropTypes.array.isRequired,
};

Masonry.defaulProps = {
  breakPoints: [350, 500, 750],
};

export default Masonry;