import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Main.module.scss';

const Masonry = ({ breakPoints, children }) => {
  const masonryRef = useRef(null);
  const [ columns, setColumns ]= useState(1);

  const onResize = useCallback(
    () => {
      const newColumns = getColumns(masonryRef.current.offsetWidth);
      if(columns !== newColumns){
        setColumns(newColumns);
      }
    },
    [],
  );

  useEffect(() => {
    onResize();
    // initiate the event handler
    window.addEventListener('resize', onResize);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  const getColumns = (w) =>{
		return breakPoints.reduceRight((p, c, i) => c < w ? p : i, breakPoints.length);
  }

  const mapChildren = () => {
		let col = [];
		const numC =columns;
		for(let i = 0; i < numC; i++){
			col.push([]);
		}
		return children.reduce((acc, cur, ind) => {
			acc[ind%numC].push(cur);
			return acc;
		}, col);
  }

  return (
    <div className={styles.masonry} ref={masonryRef}>
      {mapChildren().map((col, ci) => {
        return (
          <div className={styles.column} key={ci} >
            {col.map((child, i) => {
              return <div key={i}>{child}</div>
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Masonry;