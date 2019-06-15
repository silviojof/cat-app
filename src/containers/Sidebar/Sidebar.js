import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCategories, changeCategory } from 'redux/ducks/categories';
import { ReactComponent as Cat } from 'assets/images/cat.svg';
import styles from './Sidebar.module.scss';

const Sidebar =  ({ fetchCategories, categories, changeCategory,
  isLoadingCategories, active }) => {
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  if (isLoadingCategories || !active) return <p>loading</p>;
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
      <Cat />
      </div>
      <nav className={styles.nav}>
        <ul>
        {
          categories.map(el => (
            <li
              key={el.id}
              className={el.id === active.id ? styles.active : ''}
              onClick={() => changeCategory(el)}
            >
              {el.name}
            </li>
          ))
        }
        </ul>
      </nav>
    </aside>
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
    changeCategory: args => dispatch(changeCategory(args)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);