import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCats } from 'redux/ducks/cats';

const Main =  ({ fetchCats, cats, isLoadingCats, active, error }) => {
  if (isLoadingCats) return <p>loading</p>;
  return (
    <header>
      {
        cats.map(el => (
          <p key={el.id}>{el.url}</p>
        ))
      }
      <button onClick={() => fetchCats(active.id)}>Load More</button>
    </header>
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