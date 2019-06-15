import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCats } from 'redux/ducks/cats';
import Tile from './Tile';
import Masonry from './Masonry';
import styles from './Main.module.scss';

const Main =  ({ fetchCats, cats, isLoadingCats, active, error }) => {
  // if (isLoadingCats) return <p>loading</p>;
  return (
    <section className={styles.main}>
      <Masonry breakPoints={[350, 500, 750]}>
        {cats.map(image => {
          return (
            <Tile key={image.id} src={image.url} />
          )
        })}
			</Masonry>
      <button onClick={() => fetchCats(active.id)}>Load More</button>
    </section>
  );
}

const mapStateToProps = ({ cats, categories }) => {
  return {
    isLoadingCats: cats.isLoadingCats,
    cats: cats.cats,
    error: cats.error,
    active: categories.active,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCats: args => dispatch(fetchCats(args)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);