import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCats } from 'redux/ducks/cats';
import Spinner from 'components/Spinner';
import Tile from 'components/Tile';
import Masonry from 'components/Masonry';
import styles from './Main.module.scss';

const Main =  ({ fetchCats, cats, isLoadingCats, active, error }) => {
  if (isLoadingCats && cats.length === 0)
  return (
    <div className={styles.spinnerBox} data-testid="page-spinner">
      <Spinner colored/>
    </div>
  )
  return (
    <section className={styles.main}>
      <Masonry breakPoints={[350, 500, 750]}>
        {cats.map(image => {
          return (
            <Tile key={image.id} src={image.url} />
            )
          })}
			</Masonry>
      <button
        onClick={() => fetchCats(active.id)}
        className={styles.button}
      >
        {
          isLoadingCats &&
          <Spinner />
        }
        <span>Load More</span>
      </button>
    </section>
  );
}

Main.propTypes = {
  active: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  cats: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
  error: PropTypes.bool,
  fetchCats: PropTypes.func.isRequired,
  isLoadingCats: PropTypes.bool,
};

Main.defaultProps = {
  active: null,
  error: false,
  isLoadingCats: false,
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