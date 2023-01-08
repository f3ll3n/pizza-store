import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

import styles from "./Search.module.scss";

const Search = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(state => state.filter.search);
  return (
    <label className={styles.root}>
      <input
        value={searchValue}
        onChange={event => dispatch(setSearchValue(event.target.value))}
        className={styles.input}
        placeholder="Поиск пиццы ..."
      />
      <img
        className={styles.icon}
        src="https://www.svgrepo.com/show/448592/search.svg"
        alt="Иконка поиска"
      />
      {searchValue && (
        <img
          onClick={() => setSearchValue("")}
          className={styles.iconClose}
          src="https://www.svgrepo.com/show/446990/close.svg"
          alt="Иконка очистки текста"
        />
      )}
    </label>
  );
};

export default Search;
