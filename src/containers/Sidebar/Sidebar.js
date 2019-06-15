import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCategories } from 'redux/ducks/categories';

const Sidebar =  ({ fetchCategories, categories, isLoadingCategories, active }) => {
  useEffect(() => {
    fetchCategories();
  }, []);
  if (isLoadingCategories) return <p>loading</p>;
  return (
    <header>
      {
        categories.map(el => (
          <p key={el.id}>{el.name}</p>
        ))
      }
      <h1>Sidebar</h1>
    </header>
  );
}

const mapStateToProps = ({ categories }) => {
  return {
    categories: categories.categories,
    isLoadingCategories: categories.isLoadingCategories,
    active: categories.active,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: args => dispatch(fetchCategories(args)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);